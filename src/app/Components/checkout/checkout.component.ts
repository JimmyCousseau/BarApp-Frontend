import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Products } from 'src/app/Interfaces/Products';
import { MenuService } from 'src/app/Services/ComponentService/menu.service';
import { Order } from '../../Interfaces/Order';
import { CheckoutService } from '../../Services/ComponentService/checkout.service';
import { AuthService } from '../../Services/Security/auth.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  orders: Order[] = [];
  products: Products[] = [];
  dataSource!: MatTableDataSource<Order>
  totalPrice: number = 0;
  displayedColumns = ["serveur", "intitule", "quantite", "prix", "prix_total"]
  selected: number = 0;
  @ViewChild('contentToExportPdf') invoiceElement!: ElementRef;


  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly menuService: MenuService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Order>()
    this.selected = 0
    this.checkoutService.findAll().subscribe(data => {
      this.orders = data;
      let dataPassedByUrl = this.route.snapshot.paramMap.get('id')
      if (dataPassedByUrl) {
        let table = Number(dataPassedByUrl)
        this.selected = table
        this.applyFilter(table)
      }
    })
    this.menuService.findAllProducts().subscribe(data => {
      this.products = data
    })
  }

  getPrice(productName: string): number {
    let product = this.products.find(p => p.name === productName)
    return product === undefined ? 0 : product.price_sold
  }

  applyFilter(idtable: number): void {
    this.selected = idtable
    this.dataSource = new MatTableDataSource<Order>(this.orders.filter((data) => data.table_id === idtable))
  }

  generatePdf(): void {
    let PDF = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a6',
      compress: true,
    });
    PDF.text(document.title, 10, 10);

    html2canvas(this.invoiceElement.nativeElement).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      const fileWidth = 95;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 5, 15, fileWidth, generatedImageHeight,);
      PDF.html(this.invoiceElement.nativeElement.innerHTML)
      PDF.save('facture.pdf');
    });
  }

  listTable(): number[] {
    return this.orders.map((order) => order.table_id).filter((v, i, s) => s.indexOf(v) === i)
  }

  totalPriceOrder(idtable: number): number {
    return this.orders
      .filter((order) => order.table_id === idtable)
      .reduce((sum, order) => sum + this.getPrice(order.name) * order.amount, 0)
  }

  confirmOrder(idtable: number): void {
    this.checkoutService.confirmPaiement(AuthService.getUser().username, idtable).subscribe((data) => {
      this.ngOnInit();
    });
  }

  getDateOrder(idtable: number): Date {
    return this.orders.find((order) => order.table_id === idtable)?.date || new Date()
  }
}

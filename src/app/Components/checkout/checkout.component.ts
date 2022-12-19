import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CheckoutOrder } from '../../Interfaces/CheckoutOrder';
import { CheckoutService } from '../../Services/ComponentService/CheckoutService';
import { AuthService } from '../../Services/Security/auth.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  selected = 0;

  checkoutOrders: CheckoutOrder[] = [];
  totalPrice: number = 0;

  @ViewChild('contentToExportPdf') invoiceElement!: ElementRef;


  constructor(
    private readonly checkoutService: CheckoutService,
  ) { }

  ngOnInit(): void {
    this.checkoutService.findAll().subscribe(data => {
      this.checkoutOrders = data;
    })
    this.selected = 0;
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
    let tables: number[] = [];
    this.checkoutOrders.forEach(order => {
      if (!(tables.includes(order.IDTable))) {
        tables.push(order.IDTable);
      }
    })
    return tables;
  }

  listOfOrders(idtable: number): any[] {
    let orders: any[] = [];
    this.checkoutOrders.forEach(order => {
      if (order.IDTable === idtable) {
        orders.push(order);
      }
    })
    return orders;
  }

  listOrderIsEmpty(idtable: number): boolean {
    if (this.listOfOrders(idtable).length == 0) {
      return true;
    }
    return false;
  }

  totalPriceOrder(idtable: number): number {
    let total: number = 0;
    this.checkoutOrders.forEach(order => {
      if (order.IDTable == idtable) {
        total += (order.Prix * order.Quantite);
      }
    })
    return total;
  }

  confirmOrder(idtable: number): void {
    this.checkoutService.confirmPaiement(AuthService.getUser().Username, idtable).subscribe((data) => {
      this.ngOnInit();
    });
  }

  getDateOrder(idtable: number): Date {
    let date: Date = new Date();
    this.checkoutOrders.forEach(order => {
      if (order.IDTable == idtable) {
        date = order.Horodatage;
      }
    });
    return date;
  }
}

import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from '../../Services/ComponentService/menu.service';
import { Products } from '../../Interfaces/Products';
import { Sections } from '../../Interfaces/Sections';
import { AuthService } from '../../Services/Security/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MenuOrder, Order } from 'src/app/Interfaces/Order';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  products: Products[] = []
  sections: Sections[] = []
  current_section: string | null = null
  private orders!: MenuOrder[]
  private tableID!: number
  currentUsername: string = ""

  dataSource!: MatTableDataSource<MenuOrder>
  displayedColumns = ['intitule', 'prix', 'quantite']

  constructor(
    private menuService: MenuService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.menuService.findAllSections().subscribe(data => {
      this.sections = data;
    });
    this.menuService.findAllProducts().subscribe(data => {
      this.products = data;
    });
    this.menuService.sharedOrder.subscribe(order => this.orders = order);
    this.menuService.sharedSection.subscribe(current_section => this.current_section = current_section)
    this.menuService.sharedTableID.subscribe(id => this.tableID = id)
    this.refreshDataSource()
    this.currentUsername = AuthService.getUser().username;
  }

  changeSections(section: string): void {
    this.menuService.changeSection(section)
  }

  backButton(): void {
    let found = this.sections.find((section) => section.current_section === this.current_section)
    this.current_section = found !== undefined ? found.parent_section : ""
  }

  haveProductsInside(): boolean {
    return this.products.some((product) => product.section === this.current_section)
  }

  isOrderContainItems(): boolean {
    return this.orders.length !== 0
  }

  incrementProductQuantity(product: Products): void {
    let quantite = this.orders.find((order: any) => order.name === product.name)
    quantite !== undefined
      ? quantite.amount++
      : this.orders.push({ name: product.name, price: product.price_sold === undefined ? 0 : product.price_sold, amount: 1 })
    this.refreshDataSource()
  }

  private refreshDataSource(): void { this.dataSource = new MatTableDataSource<MenuOrder>(this.orders) }

  reduceQuantiteInOrder(product: Order): void {
    this.orders.forEach((order, index) => {
      if (order.name === product.name) {
        if (order.amount === 1) {
          this.orders.splice(index, 1);
          this.dialog.closeAll();
        }
        else
          order.amount--;
      }
    })
  }

  validateDeleteProductInOrder(product: Order): void {
    this.orders.forEach((order, index) => {
      if (order.name === product.name) this.orders.splice(index, 1);
    })
    this.dialog.closeAll();
    this.ngOnInit();
  }

  sendOrderToPrepare(): void {
    this.orders.forEach((order) => {
      this.menuService.sendOrderToPrepare(this.currentUsername, this.tableID, order).subscribe(() => {
        this.router.navigate(['../orders'])
        this.menuService.resetShared()
      });
    })
  }

  openActionDialog(ref: TemplateRef<any>, data: Order) {
    this.dialog.open(ref, { data: data });
  }

  incrementTableNumber(table: number) {
    let nb = Number(this.tableID.toString() + table.toString())
    this.menuService.changeTableID(nb > 255 ? 255 : nb)
  }

  decrementTableNumber() { this.menuService.changeTableID(Math.floor(this.tableID / 10)) }
  clearTableNumber() { this.menuService.changeTableID(0) }
  getTableID(): Readonly<number> { return this.tableID }
  getOrders(): Readonly<MenuOrder[]> { return this.orders }

  getProductsOfSection(): Readonly<Products[]> { return this.products.filter((product) => product.section === this.current_section) }

  getChildSections(): Readonly<Sections[]> { return this.sections.filter((section) => section.parent_section === this.current_section) }

  getNumberColumns() {
    let obj = document.getElementById('products')
    return obj !== null ? obj.clientWidth / 120 : 2
  }


  closeAllDialog() {
    this.dialog.closeAll();
  }
}

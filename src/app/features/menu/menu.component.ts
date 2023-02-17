import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MenuService } from '../../shared/services/menu.service';
import { Order } from '../../core/Interfaces/Order';
import { Products } from '../../core/Interfaces/Products';
import { Sections } from '../../core/Interfaces/Sections';
import { Dialog } from '../../shared/components/dialog/Dialog';
import { ProductService } from '../../core/http/product.service';
import { SectionService } from '../../core/http/section.service';
import { OrderService } from '../../core/http/order.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent extends Dialog implements OnInit {
  products!: Products[]
  sections!: Sections[]
  current_section: string | null = null

  private orders!: Order[]
  private tableID!: number
  private modificationMod = false

  currentUsername: string = ""

  dataSource!: MatTableDataSource<Order>

  productForm = new FormGroup({
    productName: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
    productPriceSold: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(65535)]),
    productPriceBought: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(65535)]),
    productAmount: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(65535)]),
    productNeedPreparation: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1)]),
  })

  constructor(
    private sectionService: SectionService,
    private productService: ProductService,
    private menuService: MenuService,
    private orderService: OrderService,
    protected override dialog: MatDialog,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {
    super(dialog)
  }

  override ngOnInit(): void {
    this.sectionService.findAll().subscribe((sections: Sections[]) => {
      this.sections = sections;
    });
    this.productService.findAll().subscribe((products: Products[]) => {
      this.products = products;
    });
    this.menuService.sharedOrder.subscribe(order => this.orders = order);
    this.menuService.sharedSection.subscribe(current_section => this.current_section = current_section)
    this.menuService.sharedTableID.subscribe(id => this.tableID = id)

    this.dataSource = new MatTableDataSource<Order>(this.orders)
  }

  protected override reset(): void {
    this.dialog.closeAll()
    this.menuService.resetShared()
    this.ngOnInit()
  }

  backButton(): void {
    let found = this.sections.find((section) => section.current_section === this.current_section)
    this.current_section = found !== undefined ? found.parent_section : null
    this.menuService.changeSection(this.current_section)
  }

  incrementProductAmount(product: Products): void {
    if (this.isMenuMod())
      return
    const quantite = this.orders.find((o: any) => o.name === product.name && o.note === "")
    quantite !== undefined
      ? quantite.amount++
      : this.orders.push({ name: product.name, amount: 1, unit_price: product.price_sold, note: "", waiter: "", table_id: 0, date: new Date(), state: "" })
    this.dataSource = new MatTableDataSource<Order>(this.orders)
  }

  reduceQuantiteInOrder = (product: Order): void => {
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

  deleteProductInOrder = (product: Order): void => {
    this.orders.forEach((order, index) => {
      if (order.name === product.name) this.orders.splice(index, 1);
    })
    this.dialog.closeAll();
    this.ngOnInit();
  }

  sendOrderToPrepare(): void {
    this.orders.forEach((order) => {
      order.table_id = this.tableID
      const result = this.getNeedPreparation(order.name)
      this.orderService.sendOrderToPrepare(result ? result : false, order).subscribe(() => {
        this.reset()
        this.router.navigate(['../orders'])
      });
    })
  }

  incrementTableNumber(table: number) {
    let nb = Number(this.tableID.toString() + table.toString())
    this.menuService.changeTableID(nb > 255 ? 255 : nb)
  }

  deleteProduct = (product: Products): void => {
    this.productService.delete(product.name).subscribe(() => {
      this.snackbar.open("Opération effectué", "Ok", { duration: 3000 })
      this.reset()
    })
  }

  getNeedPreparation(name: string): boolean | undefined { return this.products.find((prod) => prod.name === name)?.need_preparation }

  changeSections(section: string | null): void {
    this.menuService.changeSection(section)
    this.current_section = section
  }

  swapMod(): void { this.modificationMod = !this.modificationMod }

  decrementTableNumber(): void { this.menuService.changeTableID(Math.floor(this.tableID / 10)) }
  clearTableNumber(): void { this.menuService.changeTableID(0) }

  canSwapMod(): boolean { return this.menuService.canSwapMod() }
  isMenuMod(): boolean { return this.modificationMod }
  isOrderContainItems(): boolean { return this.orders.length !== 0 }

  getTableID(): number { return this.tableID }
  getProductsOfSection(): Products[] { return this.products.filter((product) => product.section === this.current_section) }
  getChildSections(): Sections[] { return this.sections.filter((section) => section.parent_section === this.current_section) }
  getCurrentSection(): Sections { return { id: 0, parent_section: this.current_section, current_section: "" } }
  getNumberColumns() {
    let obj = document.getElementById('products')
    return obj !== null ? obj.clientWidth / 120 : 2
  }

}

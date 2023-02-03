import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from '../../../core/http/checkout.service';
import { Order } from '../../../core/Interfaces/Order';
import { MenuService } from '../../http/menu.service';
import { Products } from '../../Interfaces/Products';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  loaded = false;
  orders: Order[] = []
  products: Map<string, number> = new Map();

  dataSource!: MatTableDataSource<Order>
  totalPrice: number = 0;
  displayedColumns = ["serveur", "intitule", "quantite", "prix", "prix_total"]
  selected: number = 0;

  constructor(
    private route: ActivatedRoute,
    private readonly checkoutService: CheckoutService,
    private readonly menuService: MenuService,
  ) {

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Order>()
    this.selected = 0
    this.checkoutService.findAll().subscribe((data: Order[]) => {
      let orders: Order[] = []
      data.forEach((value: Order) => {
        let found = orders.find((o) => o.table_id === value.table_id && o.name === value.name && o.note === value.note)
        found ? found.amount += value.amount : orders.push(value)
      })
      this.orders = orders;
      let dataPassedByUrl = this.route.snapshot.paramMap.get('id')
      if (dataPassedByUrl) {
        let table = Number(dataPassedByUrl)
        this.selected = table
        this.applyFilter(table)
      }
    })

    this.menuService.findAllProducts().subscribe((products: Products[]) => {
      products.forEach((product) => {
        this.products.set(product.name, product.price_sold)
      })
    })
  }

  applyFilter(idtable: number): void {
    this.selected = idtable
    this.dataSource = new MatTableDataSource<Order>(this.orders.filter((data) => data.table_id === idtable))
  }

  listTable(): number[] {
    let tables: number[] = []
    this.orders.forEach((order) => {
      let found = tables.find((table) => table === order.table_id)
      if (found === undefined)
        tables.push(order.table_id)
    })
    return tables
  }

  totalPriceOrder(idtable: number): number {
    return this.orders
      .filter((order) => order.table_id === idtable)
      .reduce((sum, order) => {
        let found = this.products.get(order.name)
        if (!found)
          found = 0
        return sum + found * order.amount
      }, 0)
  }

  getPrice(productName: string): number {
    const found = this.products.get(productName)
    return found ? found : 0
  }

  confirmOrder(idtable: number): void {
    this.checkoutService.confirmPaiement(idtable).subscribe(() => {
      this.ngOnInit();
    });
  }

  getDateOrder(idtable: number): Date {
    return this.orders.find((order) => order.table_id === idtable)?.date || new Date()
  }

}

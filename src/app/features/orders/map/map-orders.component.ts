import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalSettingsService } from 'src/app/core/http/global-settings.service';
import { OrderService } from 'src/app/core/http/order.service';
import { Block, Map } from 'src/app/core/Interfaces/Map';
import { Order } from 'src/app/core/Interfaces/Order';
import { millisecondsToHours, showResponseDialog } from 'src/app/core/utils/common-functions';
import { OrderPageService } from 'src/app/shared/services/order-page.service';
import { OrdersComponent } from '../main/orders.component';

@Component({
  selector: 'app-map-orders',
  templateUrl: './map-orders.component.html',
  styleUrls: ['./map-orders.component.scss'],
})
export class MapOrdersComponent extends OrdersComponent {

  private readonly defaultBlock: Block = { img: "c.svg", table: -1 }
  private readonly urlImg: string = "/assets/images/map/"

  readonly decors: Block[] =
    [ // -1 = static block without interaction, 1 = table block
      this.defaultBlock, { img: "bunny.ico", table: -1 },
      { img: "ceramic.jpg", table: -1 },
      { img: "table.svg", table: -2 },
      { img: "chef.png", table: -1 },
      { img: "cook.png", table: -1 }
    ]

  private pencil: Block = { ...this.defaultBlock }

  editionMod: boolean = false;
  hover: number = -1

  setBlockIDControl = new FormGroup({
    idtable: new FormControl(null, Validators.compose([Validators.required, Validators.min(1), Validators.max(255)])),
  })

  map: Map = {
    width: 0,
    blocks: []
  }

  mapMod: Map = {
    width: 0,
    blocks: [],
  }

  constructor(
    protected override orderService: OrderService,
    protected override orderPageService: OrderPageService,
    protected override dialog: MatDialog,
    private globalSettingsService: GlobalSettingsService,
    private snackBar: MatSnackBar,
  ) {
    super(orderService, orderPageService, dialog)
  }

  override ngOnInit(): void {
    super.ngOnInit()
    this.editionMod = false
    this.globalSettingsService.findMap().subscribe((data: Map) => {
      this.map = data
      this.updateMapMod()
    })
  }

  addRow(n: number) {
    let nrow = Number((n / this.mapMod.width).toString().split('.')[0])
    for (let i = 0; i < this.map.width; i++)
      this.map.blocks.splice(nrow * this.map.width, 0, this.defaultBlock)
    this.updateMapMod()
  }

  removeRow(n: number) {
    let nrow = Number((n / this.mapMod.width).toString().split('.')[0])
    this.map.blocks.splice(nrow * this.map.width, this.map.width)
    this.updateMapMod()
  }

  addColumn(n: number): void {
    for (let i = this.map.blocks.length / this.map.width - 1; i >= 0; i--)
      this.map.blocks.splice(n + this.map.width * i, 0, this.defaultBlock)
    this.map.width++
    this.updateMapMod()
  }

  removeColumn(n: number): void {
    for (let i = (this.map.blocks.length / this.map.width) - 1; i >= 0; i--)
      this.map.blocks.splice(n + this.map.width * i, 1)
    this.map.width--
    this.updateMapMod()
  }

  validate = (): void => {
    this.globalSettingsService.upsertMap(this.map).subscribe((data) => {
      showResponseDialog(this.snackBar, data, "La carte a bien été enregistré")
      if (data !== null) {
        this.editionMod = false
        this.dialog.closeAll()
      }
    })
  }

  setPencil(pencilImg: string) {
    const block = this.decors.find((v) => v.img === pencilImg)
    if (block !== undefined)
      this.pencil = block
  }

  setPencilTableAndCell = (data: any): void => {
    const oldTableID = this.pencil.table
    this.pencil.table = parseInt(data.value)
    this.dialog.closeAll()
    this.setCell(data.cellID)
    this.pencil.table = oldTableID
    this.updateMapMod()
  }

  openSetCellDialog(ref: TemplateRef<any>, cellID: number) {
    cellID -= Number((cellID / this.map.width).toString().split('.')[0])
    if (this.pencil.table !== -1)
      this.dialog.open(ref, { data: { foo: this.setPencilTableAndCell, data: cellID } })
    else
      this.setCell(cellID)
  }

  private setCell(cellID: any) {
    if (this.decors.some(decor => decor.img === this.pencil.img))
      this.map.blocks[cellID] = { ...this.pencil }
    this.updateMapMod()
  }

  private updateMapMod(): void {
    this.mapMod = JSON.parse(JSON.stringify(this.map)) as typeof this.map
    const length = this.map.blocks.length
    this.mapMod.width = this.map.width + 2
    for (let i = 1; i < (length / this.map.width) + 1; i++) {
      this.mapMod.blocks.splice((this.mapMod.width) * i - 2, 0, { img: '', table: 0 })
      this.mapMod.blocks.splice((this.mapMod.width) * (i - 1), 0, { img: '', table: 0 })
    }
  }

  getPencil(): Readonly<{ img: string, table: number }> { return this.pencil }

  getUrlImg(img: string): Readonly<string> { return this.urlImg + img }

  getOrdersBy(table_id: number): Order[] { return this.orders.filter(order => order.table_id === table_id) }

  haveOrders(table_id: number): boolean { return this.orders.some((order) => order.table_id === table_id) }

  getLongestTimeWaitingTable(table_id: number): string {
    let found = new Date(this.orders.reduce((prev, acc) => {
      if (prev.table_id === table_id && new Date(prev.date) < new Date(acc.date)) {
        return prev
      }
      return acc
    }).date)
    let now = new Date(Date.now())
    let diffInHour = millisecondsToHours(now.getTime() - found.getTime())
    let hours = Number(diffInHour.toString().split(".")[0])
    if (hours > 9)
      return "+9h"
    return hours + ":" + ((diffInHour % 1) * 60).toString().split(".")[0]
  }

  getTablesOutOfMap(): number[] {
    let tables: number[] = []
    this.orders.forEach((order: Order) => {
      if (!this.map.blocks.some((block: Block) => block.table === order.table_id)
        && !tables.some((table: number) => table === order.table_id))
        tables.push(order.table_id)
    })
    return tables
  }


}

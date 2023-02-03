import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../../../app.component';
import { AuthService } from '../../../core/authentification/auth.service';
import { MapOrdersService } from '../../../core/http/map-orders.service';
import { OrderService } from '../../../core/http/order.service';
import { Block, Map } from '../../../core/Interfaces/Map';
import { Order } from '../../../core/Interfaces/Order';
import { showResponseDialog } from '../../../core/utils/common-functions';
import { Dialog } from '../../utils/Dialog';

@Component({
  selector: 'app-map-orders',
  templateUrl: './map-orders.component.html',
  styleUrls: ['./map-orders.component.scss']
})
export class MapOrdersComponent extends Dialog implements OnInit {

  private readonly defaultBlock: Block = { img: "c.svg", table: -1 }
  private readonly urlImg: string = "/assets/images/map/"

  private pencil: Block = { ...this.defaultBlock }

  private decors: Block[] =
    [ // -1 = static block without interaction, 1 = table block
      this.defaultBlock, { img: "bunny.ico", table: -1 },
      { img: "ceramic.jpg", table: -1 },
      { img: "table.svg", table: -2 },
      { img: "chef.png", table: -1 },
      { img: "cook.png", table: -1 }
    ]

  password: string = "";

  editionMod: boolean = false;
  hover: number = -1

  setBlockIDControl = new FormGroup({
    idtable: new FormControl(null, Validators.compose([Validators.required, Validators.min(1), Validators.max(255)])),
  })

  private orders: Order[] = []

  private map: Map = {
    width: 0,
    blocks: []
  }

  constructor(
    private mapService: MapOrdersService,
    private orderService: OrderService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private appComponent: AppComponent,
    protected override dialog: MatDialog,
  ) {
    super(dialog)
  }

  override ngOnInit(): void {
    this.editionMod = false
    this.mapService.find().subscribe((data: Map) => {
      this.map = data
    })
    this.orderService.findAllBy(this.authService.getUser().username).subscribe((data: Order[]) => {
      this.orders = data
    })
  }

  addRow() {
    for (let i = 0; i < this.map.width; i++)
      this.map.blocks.push(this.defaultBlock)
  }

  addColumn() {
    const length = this.map.blocks.length
    for (let i = length / this.map.width; i > 0; i--)
      this.map.blocks.splice((i * this.map.width), 0, this.defaultBlock)
    this.map.width++
  }

  validate = (): void => {
    this.mapService.upsert(this.map).subscribe((data) => {
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
  }

  openSetCellDialog(ref: TemplateRef<any>, cellID: number) {
    if (this.pencil.table !== -1)
      this.dialog.open(ref, { data: { foo: this.setPencilTableAndCell, data: cellID } })
    else
      this.setCell(cellID)
  }

  private setCell(cellID: any) {
    if (this.decors.some(decor => decor.img === this.pencil.img))
      this.map.blocks[cellID] = { ...this.pencil }
  }

  isLoaded(): boolean { return this.map !== undefined || this.map !== null }

  getDecors(): Readonly<{ img: string, table: number }>[] { return this.decors }

  getPencil(): Readonly<{ img: string, table: number }> { return this.pencil }

  getUrlImg(img: string): Readonly<string> { return this.urlImg + img }

  getMapWidth(): Readonly<number> { return this.map.width }
  getMapBlocks() { return this.map.blocks }

  getOrdersBy(table_id: number): Order[] { return this.orders.filter(order => order.table_id === table_id) }

  haveOrders(table_id: number): boolean { return this.orders.some((order) => order.table_id === table_id) }

  setStateOrderPage() { this.appComponent.setLastStateOrderPage("list") }
}

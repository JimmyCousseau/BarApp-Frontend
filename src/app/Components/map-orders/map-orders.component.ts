import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UserProxy } from '../../Interfaces/User';
import { MapOrdersService } from '../../Services/ComponentService/map-orders.service';
import { AuthService } from '../../Services/Security/auth.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-map-orders',
  templateUrl: './map-orders.component.html',
  styleUrls: ['./map-orders.component.scss']
})
export class MapOrdersComponent implements OnInit {

  private readonly defaultBlock = { img: "c.svg", table: -1 }
  private readonly urlImg: string = "../../../assets/images/map/"

  private pencil = { ...this.defaultBlock }

  private decors: { img: string, table: number }[] =
    [ // -1 = static block without interaction, 1 = table block
      this.defaultBlock, { img: "bunny.ico", table: -1 },
      { img: "ceramic.jpg", table: -1 },
      { img: "craft.png", table: 1 },
      { img: "chef.ico", table: -1 },
      { img: "cook.png", table: -1 }
    ]

  password: string = "";

  editionMod: boolean = false;
  hover: number = -1

  setBlockIDControl = new FormGroup({
    idtable: new FormControl(null, Validators.compose([Validators.required, Validators.min(1), Validators.max(255)])),
  })

  private map = {
    width: 0,
    blocks: [{ ...this.defaultBlock }],
  }

  constructor(
    private mapService: MapOrdersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private appComponent: AppComponent,
  ) {
  }

  ngOnInit(): void {
    this.editionMod = false
    this.mapService.getMap().subscribe((data: any) => {
      this.map.width = 1
      if (data !== null)
        this.map = data
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

  openDialog(ref: TemplateRef<any>, foo: ((args: any) => void) | undefined, data: string): void {
    this.dialog.open(ref, { data: { foo: foo, data: data } });
  }

  redirectDialogValidation(func: ((args: string) => void), data: string): void {
    if (func !== undefined)
      func(data)
  }

  validate = (): void => {
    const currentUser = this.getCurrentUser()
    this.mapService.upsertMap(JSON.stringify(this.map), currentUser).subscribe((data) => {
      this.showResponseDialog(data, "La carte a bien été enregistré")
      if (data !== null) {
        this.editionMod = false
        this.dialog.closeAll()
      }
    })
  }

  setPencil = (pencil: any) => {
    if (!this.decors.some(decor => decor.img === pencil)) {
      this.pencil = { ...this.defaultBlock }
      return
    }
    this.pencil.table = -1

    let formValue = this.setBlockIDControl?.value.idtable
    if (!this.setBlockIDControl.invalid && formValue !== undefined && formValue !== null)
      this.pencil.table = parseInt(formValue)

    this.setBlockIDControl.reset()
    this.pencil.img = pencil
    this.dialog.closeAll()
  }

  setCell(cellID: number) {
    if (this.decors.some(decor => decor.img === this.pencil.img))
      this.map.blocks[cellID] = { ...this.pencil }
  }

  closeAllDialog() { this.dialog.closeAll(); }

  getDecors(): Readonly<{ img: string, table: number }>[] { return this.decors }

  getPencil(): Readonly<{ img: string, table: number }> { return this.pencil }

  getUrlImg(img: string): Readonly<string> { return this.urlImg + img }

  getMapWidth(): Readonly<number> { return this.map.width }
  getMapBlocks() { return this.map.blocks }

  setStateOrderPage() { this.appComponent.setLastStateOrderPage("list") }

  private showResponseDialog(
    data: any,
    message: string,
    noObjectMessage: string = "Mauvais mot de passe, veuillez réessayer",
    falseMessage: string = "Something went wrong"
  ) {
    if (data === null)
      this.snackBar.open(noObjectMessage, "ok", { duration: 3000 });
    else if (data === false)
      this.snackBar.open(falseMessage, "ok", { duration: 3000 });
    else {
      this.ngOnInit();
      this.snackBar.open(message, "ok", { duration: 3000 });
    }
  }

  private getCurrentUser(): User {
    const user = AuthService.getUser()
    const currentUser = {
      username: user.username,
      role: user.role,
      password: this.password
    };
    this.password = '';
    return currentUser;
  }

}

import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../Interfaces/User';
import { MapOrdersService } from '../../Services/ComponentService/map-orders.service';
import { AuthService } from '../../Services/Security/auth.service';

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
    blocks: [{ img: "", table: -1 }],
  }

  constructor(
    private mapService: MapOrdersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.editionMod = false
    this.mapService.getMap().subscribe((data: any) => {
      if (data !== null) {
        this.map.width = data.width
        this.map.blocks = data.blocks
      }
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
    console.log(data)
    this.dialog.open(ref, { data: { foo: foo, data: data } });
  }

  redirectDialogValidation(func: ((args: string) => void), data: string): void {
    console.log(data)
    if (func !== undefined)
      func(data)
    this.dialog.closeAll()
  }

  validate = (): void => {
    const currentUser = this.getCurrentUser()
    this.mapService.upsertMap(JSON.stringify(this.map), currentUser).subscribe((data) => {
      this.showResponseDialog(data, "La carte a bien été enregistré")
      if (data !== null)
        this.editionMod = false
    })
  }

  setPencil = (pencil: any) => {
    console.log(pencil)
    if (!this.decors.some(decor => decor.img === pencil)) {
      this.pencil.img = ""
      return
    }
    this.pencil.table = -1
    let formValue = this.setBlockIDControl?.value.idtable
    if (formValue !== undefined && formValue !== null) {
      let table = parseInt(formValue)
      this.pencil.table = table
    }
    this.setBlockIDControl.reset()
    this.pencil.img = pencil
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
      Username: user.Username,
      Role: user.Role,
      Password: this.password
    };
    this.password = '';
    return currentUser;
  }

}

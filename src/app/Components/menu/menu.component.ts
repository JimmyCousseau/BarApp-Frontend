import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/Security/auth.service';
import { Products } from '../../Interfaces/Products';
import { Sections } from '../../Interfaces/Sections';
import { SendOrder } from '../../Interfaces/SendOrder';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'src/app/Services/ComponentService/MenuService';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  form = new FormGroup({
    idtable: new FormControl(0, [Validators.required]),
  })
  products: Products[] = [];
  sections: Sections[] = [];
  currentSection: string = "";
  orders: SendOrder[] = [];

  constructor(
    private menuService: MenuService,
    private snackBar: MatSnackBar,
    private readonly authService: AuthService,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.menuService.getMenuSections().subscribe(data => {
      this.sections = data;
      this.currentSection = this.sections[0].sectionParente;
    });
    this.menuService.getMenuProducts().subscribe(data => {
      this.products = data;
    });
    this.menuService.sharedOrder.subscribe(order => this.orders = order);
  }

  reset(): void {
    this.menuService.getMenuSections().subscribe(data => {
      this.sections = data;
      this.currentSection = this.sections[0].sectionParente;
    });
    this.menuService.getMenuProducts().subscribe(data => {
      this.products = data;
    });
    this.orders = [];
    this.menuService.resetSharedOrder();
  }

  changeSections(section: string): void {
    this.currentSection = section;
  }

  backButton(): void {
    this.sections.forEach(section => {
      if (section.sectionCourante == this.currentSection) {
        this.currentSection = section.sectionParente;
      }
    });
  }

  haveSectionChild(): boolean {
    let having: boolean = false;
    this.sections.forEach(section => {
      if (section.sectionParente == this.currentSection) {
        having = true;
      }
    });
    return having;
  }

  haveProductsInside(): boolean {
    let having: boolean = false;
    this.products.forEach(product => {
      if (product.Section == this.currentSection) {
        having = true;
      }
    });
    return having;
  }

  isOrderContainItems(): boolean {
    if (this.orders.length === 0) {
      return false;
    }
    return true;
  }

  addProductInOrder(product: Products | SendOrder): void {
    let hasAdded = false;
    this.orders.forEach(order => {
      if (order.Intitule == product.Intitule) {
        order.Quantite += 1;
        hasAdded = true;
      }
    });
    if (!hasAdded) {
      this.orders.push({ Intitule: product.Intitule, Prix: product.Prix, Quantite: 1 });
    }
  }

  reduceQuantiteInOrder(product: SendOrder): void {
    this.orders.forEach((order, index) => {
      if (order.Intitule == product.Intitule) {

        if (order.Quantite == 1) this.orders.splice(index, 1);
        else order.Quantite -= 1;

      }
    })
  }

  validateDeleteProductInOrder(product: SendOrder): void {

    let snack = this.snackBar.open("Veux-tu vraiment supprimer le produit ?", "Oui", {
      duration: 3000,
      horizontalPosition: "start"
    });

    snack.onAction().subscribe(() => {
      this.deleteProductInOrder(product);
      this.closeDialog();
      this.ngOnInit();
    });

  }

  private deleteProductInOrder(product: SendOrder): void {
    this.orders.forEach((order, index) => {
      if (order.Intitule == product.Intitule) this.orders.splice(index, 1);
    })
  }

  sendOrderToPrepare(): void {
    const idtable = this.form.controls.idtable.value;
    if (Number.isNaN(Number(idtable)) || Number(idtable) < 1 || Number(idtable) > 255) {
      this.snackBar.open("Mauvais numéro de table, il doit être compris entre 1 et 255", "Ok", {
        duration: 3000,
      })
      return;
    }
    let tempOrder = this.orders;
    tempOrder.forEach((order) => {
      this.menuService.sendOrderToPrepare(this.authService.getUser().Username, Number(idtable), order).subscribe(() => {
        this.reset();
      });
    })
  }

  openActionDialog(ref: TemplateRef<any>, data: SendOrder) {
    this.dialog.open(ref, { data: data });
  }

  closeDialog() {
    this.dialog.closeAll();
  }


}

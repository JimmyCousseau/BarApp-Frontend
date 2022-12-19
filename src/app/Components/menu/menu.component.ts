import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from '../../Services/ComponentService/MenuService';
import { Products } from '../../Interfaces/Products';
import { Sections } from '../../Interfaces/Sections';
import { SendOrder } from '../../Interfaces/SendOrder';
import { AuthService } from '../../Services/Security/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  products: Products[] = [];
  sections: Sections[] = [];
  currentSection: string = "";
  orders: SendOrder[] = [];
  tableID: number = 0;
  currentUsername: string = "";

  constructor(
    private menuService: MenuService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.menuService.findAllSections().subscribe(data => {
      this.sections = data;
      this.currentSection = this.sections[0].sectionParente;
    });
    this.menuService.findAllProducts().subscribe(data => {
      this.products = data;
    });
    this.menuService.sharedOrder.subscribe(order => this.orders = order);
    this.tableID = 1;
    this.currentUsername = AuthService.getUser().Username;
  }

  reset(): void {
    this.ngOnInit()
    this.orders = []
    this.menuService.resetSharedOrder()
    this.tableID = 1
  }

  changeSections(section: string): void {
    this.currentSection = section;
  }

  backButton(): void {
    this.sections.forEach(section => {
      if (section.sectionCourante == this.currentSection) {
        this.currentSection = section.sectionParente;
      }
    })
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

  incrementProductQuantity(product: Products | SendOrder): void {
    let hasAdded = false;
    this.orders.forEach(order => {
      if (order.Intitule == product.Intitule) {
        order.Quantite++;
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
        if (order.Quantite == 1) {
          this.orders.splice(index, 1);
          this.dialog.closeAll();
        }
        else
          order.Quantite--;
      }
    })
  }

  validateDeleteProductInOrder(product: SendOrder): void {
    this.orders.forEach((order, index) => {
      if (order.Intitule == product.Intitule) this.orders.splice(index, 1);
    })
    this.dialog.closeAll();
    this.ngOnInit();
  }

  sendOrderToPrepare(): void {
    let tempOrder = this.orders;
    tempOrder.forEach((order) => {
      this.menuService.sendOrderToPrepare(this.currentUsername, this.tableID, order).subscribe(() => {
        this.reset();
      });
    })
  }

  openActionDialog(ref: TemplateRef<any>, data: SendOrder) {
    this.dialog.open(ref, { data: data });
  }

  incrementTableNumber(nb: number) {
    let str = this.tableID.toString() + nb.toString();
    this.tableID = Number(str);
    if (this.tableID > 255)
      this.tableID = 255;
  }

  decrementTableNumber() {
    this.tableID = Math.floor(this.tableID / 10); 
  }

  closeAllDialog() {
    this.dialog.closeAll();
  }
}

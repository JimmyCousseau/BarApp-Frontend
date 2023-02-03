import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sections } from '../../../core/Interfaces/Sections';
import { Products } from '../../../core/Interfaces/Products';
import { MenuService } from '../../../core/http/menu.service';
import { getValueForm, showResponseDialog } from '../../../core/utils/common-functions';
import { BaseTemplateComponent } from '../base-template/base-template.component';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styles: [],
})
export class ProductForm extends BaseTemplateComponent implements OnInit {

  @Input()
  override dataSource!: { foo: any, data: Products };

  productForm = new FormGroup({
    productName: new FormControl("", [Validators.required, Validators.maxLength(30)]),
    productPriceSold: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(65535)]),
    productPriceBought: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(65535)]),
    productAmount: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(65535)]),
    productNeedPreparation: new FormControl(false, [Validators.min(0), Validators.max(1)]),
    productSection: new FormControl("", [Validators.maxLength(30)])
  })

  sections: Sections[] = []

  constructor(
    protected override dialog: MatDialog,
    private snackBar: MatSnackBar,
    private menuService: MenuService,
  ) {
    super(dialog);
  }

  ngOnInit() {
    this.menuService.findAllSections().subscribe((sections: Sections[]) => {
      this.sections = sections
    })
    this.productForm.setValue({
      productName: this.dataSource.data.name,
      productPriceSold: this.dataSource.data.price_sold,
      productPriceBought: this.dataSource.data.price_bought,
      productAmount: this.dataSource.data.amount,
      productNeedPreparation: this.dataSource.data.need_preparation,
      productSection: this.dataSource.data.section,
    })
  }

  productDialogResponse() {
    if (this.productForm.invalid)
      return

    const name: string = getValueForm(this.productForm.value.productName)
    const priceSold: number = getValueForm(this.productForm.value.productPriceSold)
    const priceBought: number = getValueForm(this.productForm.value.productPriceBought)
    const amount: number = getValueForm(this.productForm.value.productAmount)
    const needPreparation: boolean = getValueForm(this.productForm.value.productNeedPreparation)
    const section: string | null = this.productForm.value.productSection ? this.productForm.value.productSection : null

    const product: Products = {
      id: this.dataSource.data.id,
      name: name, price_bought: priceBought, price_sold: priceSold,
      section: section, amount: amount, need_preparation: needPreparation
    }

    if (this.dataSource.data && typeof this.dataSource.data !== 'string') {
      this.modifyProduct(product)
    } else {
      this.addProduct(product)
    }
  }

  deleteProduct = (product: any[]): void => {
    if (product === undefined || null)
      return
    this.menuService.deleteProduct(product.toString()).subscribe((data) => {
      showResponseDialog(this.snackBar, data, "Le produit a bien été supprimé", "Une erreur s'est produit", "Une erreur s'est produit")
      this.dialog.closeAll()
    })
  }

  private addProduct(product: Products): void {
    this.menuService.insertProduct(product).subscribe(() => this.dialog.closeAll())
  }

  private modifyProduct(product: Products): void {
    this.menuService.updateProduct(product).subscribe(() => this.dialog.closeAll())
  }
}

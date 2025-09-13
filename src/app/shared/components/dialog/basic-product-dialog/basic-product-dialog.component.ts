import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BasicProductService } from 'src/app/core/http/basic-product.service';
import { BasicProducts } from 'src/app/core/Interfaces/BasicProducts';
import { getValueForm } from 'src/app/core/utils/common-functions';
import { HeaderDialog } from '../header-dialog/header-dialog.component';

@Component({
  selector: 'app-basic-product-dialog',
  templateUrl: './basic-product-dialog.component.html',
})
export class BasicProductDialogComponent extends HeaderDialog {

  @Input()
  override dataSource!: { foo: any, data: BasicProducts }

  productForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.maxLength(30)]),
    amount: new FormControl(0, [Validators.required, Validators.max(999999999)])
  })

  constructor(
    protected override dialog: MatDialog,
    private basicProductService: BasicProductService,
  ) {
    super(dialog);
  }

  override ngOnInit(): void {
    this.productForm.setValue({
      name: this.dataSource.data ? this.dataSource.data.name : "",
      amount: this.dataSource.data ? this.dataSource.data.amount : 0,
    })
  }

  update(): void {
    const product = {
      _id: getValueForm(this.dataSource.data?._id),
      name: getValueForm(this.productForm.value.name),
      amount: getValueForm(this.productForm.value.amount)
    }
    this.basicProductService.update(product).subscribe(() => this.dialog.closeAll())
  }

  create(): void {
    this.basicProductService.insert({
      _id: 0,
      name: getValueForm(this.productForm.value.name),
      amount: getValueForm(this.productForm.value.amount)
    }).subscribe(() => this.dialog.closeAll())
  }

  delete(): void {
    this.basicProductService.delete(getValueForm(this.dataSource.data?._id)).subscribe(() => this.dialog.closeAll())
  }

}

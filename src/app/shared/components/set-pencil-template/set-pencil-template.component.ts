import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseTemplateComponent } from '../base-template/base-template.component';

@Component({
  selector: 'app-set-pencil-template',
  templateUrl: './set-pencil-template.component.html',
  styles: [],
})
export class SetPencilTemplateComponent extends BaseTemplateComponent {

  @Input()
  override dataSource!: { foo: any, data: any };

  setBlockIDControl = new FormGroup({
    idtable: new FormControl(null, Validators.required)
  })

  constructor(
    protected override dialog: MatDialog,
  ) {
    super(dialog);
  }

  override redirectDialogValidation(func: ((args: any) => void), data: any): void {
    let value = this.setBlockIDControl?.value.idtable
    if (this.setBlockIDControl.invalid || value === undefined || value === null)
      return
    this.setBlockIDControl.reset()
    super.redirectDialogValidation(func, { cellID: data, value: parseInt(value) })
  }

}

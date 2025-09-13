import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LabelsService } from '../../../../core/http/labels.service';
import { Labels } from '../../../../core/Interfaces/Labels';
import { getValueForm } from '../../../../core/utils/common-functions';
import { HeaderDialog } from '../header-dialog/header-dialog.component';

@Component({
  selector: 'label-dialog',
  templateUrl: './label-dialog.component.html',
  styles: [],
})
export class LabelDialog extends HeaderDialog {

  @Input()
  override dataSource!: { foo: any, data: Labels }

  labelForm = new FormGroup({
    labelName: new FormControl("", [Validators.required, Validators.maxLength(25)])
  })

  constructor(
    protected override dialog: MatDialog,
    private labelService: LabelsService,
  ) {
    super(dialog);
  }
  override ngOnInit(): void {
    this.labelForm.setValue({
      labelName: this.dataSource.data ? this.dataSource.data.label : "",
    })
  }

  updateLabel(): void {
    const label = {
      label: getValueForm(this.labelForm.value.labelName),
      _id: getValueForm(this.dataSource.data?._id)
    }
    this.labelService.update(label).subscribe(() => this.dialog.closeAll())
  }

  createLabel(): void {
    this.labelService.create({ _id: 0, label: getValueForm(this.labelForm.value.labelName) }).subscribe(() => this.dialog.closeAll())
  }

  deleteLabel(): void {
    this.labelService.delete(getValueForm(this.dataSource.data?._id)).subscribe(() => this.dialog.closeAll())
  }
}

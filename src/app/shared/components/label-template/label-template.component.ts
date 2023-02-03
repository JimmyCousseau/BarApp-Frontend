import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Labels } from '../../../core/Interfaces/Labels';
import { LabelsService } from '../../../core/http/labels.service';
import { getValueForm } from '../../../core/utils/common-functions';
import { BaseTemplateComponent } from '../base-template/base-template.component';

@Component({
  selector: 'app-label-template',
  templateUrl: './label-template.component.html',
  styles: [],
})
export class LabelTemplateComponent extends BaseTemplateComponent implements OnInit {

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
  ngOnInit(): void {
    this.labelForm.setValue({
      labelName: this.dataSource.data ? this.dataSource.data.label : "",
    })
  }

  updateLabel(): void {
    const label = {
      label: getValueForm(this.labelForm.value.labelName),
      id: getValueForm(this.dataSource.data?.id)
    }
    this.labelService.update(label).subscribe(() => this.dialog.closeAll())
  }

  createLabel(): void {
    this.labelService.create({ id: 0, label: getValueForm(this.labelForm.value.labelName) }).subscribe(() => this.dialog.closeAll())
  }

  deleteLabel(): void {
    this.labelService.delete(getValueForm(this.dataSource.data?.id)).subscribe(() => this.dialog.closeAll())
  }
}

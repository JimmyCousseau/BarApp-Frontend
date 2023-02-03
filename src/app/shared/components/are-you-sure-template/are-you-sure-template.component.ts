import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseTemplateComponent } from '../base-template/base-template.component';

@Component({
  selector: 'app-are-you-sure-template',
  templateUrl: './are-you-sure-template.component.html',
  styles: [],
})
export class AreYouSureTemplateComponent extends BaseTemplateComponent {

  @Input()
  override dataSource: any

  @Input()
  message: any;

  constructor(
    protected override dialog: MatDialog,
  ) {
    super(dialog);
  }

}

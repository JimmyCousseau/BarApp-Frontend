import { Component, Input, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-base-template',
  templateUrl: './base-template.component.html',
  styles: [],
})
export class BaseTemplateComponent {

  @Input()
  dataSource: any;

  constructor(
    protected dialog: MatDialog,
  ) {

  }

  closeAllDialog(): void { this.dialog.closeAll() }

  redirectDialogValidation(foo: any, data: any): void {
    if (foo !== undefined)
      foo(data)
  }

  openDialog(ref: TemplateRef<any>, foo: any, data: any): void {
    this.dialog.open(ref, { data: { foo: foo, data: data } });
  }
}

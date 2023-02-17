import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../Dialog';

@Component({
  selector: 'header-dialog',
  templateUrl: './header-dialog.component.html',
  styles: [],
})
export class HeaderDialog extends Dialog {

  @Input()
  dataSource: any

  constructor(
    protected override dialog: MatDialog,
  ) {
    super(dialog);
  }


}

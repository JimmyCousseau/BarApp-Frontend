import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeaderDialog } from '../header-dialog/header-dialog.component';

@Component({
  selector: 'are-you-sure-dialog',
  templateUrl: './are-you-sure-dialog.component.html',
  styles: [],
})
export class AreYouSureDialog extends HeaderDialog {

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

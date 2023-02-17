import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeaderDialog } from '../../shared/components/dialog/header-dialog/header-dialog.component';
import { LabelsService } from '../../core/http/labels.service';
import { Labels } from '../../core/Interfaces/Labels';
import { Order } from '../../core/Interfaces/Order';

@Component({
  selector: 'prod-in-order-dialog',
  templateUrl: './prod-in-order-dialog.component.html',
  styles: [],
})
export class ProdInOrderDialog extends HeaderDialog {

  @Input()
  override dataSource!: { foo: any, data: Order };

  private labels: Labels[] = []

  constructor(
    protected override dialog: MatDialog,
    private labelService: LabelsService,
  ) {
    super(dialog);
    this.labelService.findAll().subscribe((labels: Labels[]) => {
      this.labels = labels
    })
  }

  addLabelToNote(label: string): string {
    if (this.dataSource.data.note.length === 0) {
      return label
    }
    const nextNote = this.dataSource.data.note + ',' + label
    return nextNote.length < 100 ? nextNote : this.dataSource.data.note
  }

  removeLabelToNote(): string {
    let result = this.dataSource.data.note.split(",")
    result.pop()
    return result ? result.toString() : ""
  }

  incrementAmount() {
    this.dataSource.data.amount++
  }

  getLabels(): ReadonlyArray<Labels> { return this.labels }

}

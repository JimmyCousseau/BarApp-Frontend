import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StateService } from '../../../../core/http/state.service';
import { Order } from '../../../../core/Interfaces/Order';
import { OrderService } from '../../../../core/http/order.service';
import { HeaderDialog } from '../header-dialog/header-dialog.component';
import { State } from '../../../../core/Interfaces/State';
import { getValueForm } from '../../../../core/utils/common-functions';
import { Labels } from 'src/app/core/Interfaces/Labels';
import { LabelsService } from 'src/app/core/http/labels.service';

@Component({
  selector: 'order-dialog',
  templateUrl: './order-dialog.component.html',
  styles: [],
})
export class OrderDialog extends HeaderDialog implements OnInit {

  @Input()
  override dataSource!: { foo: any, data: Order }

  @Input()
  canModifyLabel: boolean = false;

  formGroup = new FormGroup({
    amount: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(9999)]),
    state: new FormControl('', [Validators.required]),
    note: new FormControl('', [Validators.maxLength(100)]),
  })

  states: State[] = []

  labels: Labels[] = []

  constructor(
    protected override dialog: MatDialog,
    private orderService: OrderService,
    private stateService: StateService,
    private labelService: LabelsService,
  ) {
    super(dialog)
  }

  override ngOnInit(): void {
    this.stateService.findAll().subscribe((states: State[]) => {
      this.states = states
    })
    this.formGroup.setValue({
      amount: this.dataSource.data.amount,
      state: this.dataSource.data.state,
      note: this.dataSource.data.note,
    })
    this.labelService.findAll().subscribe((labels: Labels[]) => {
      this.labels = labels
    })
  }

  updateOrder(): void {
    if (!this.dataSource.data || this.formGroup.invalid)
      return
    let updatedOrder: Order = { ...this.dataSource.data }
    updatedOrder.amount = getValueForm(this.formGroup.value.amount)
    updatedOrder.state = getValueForm(this.formGroup.value.state)
    updatedOrder.note = getValueForm(this.formGroup.value.note)
    this.orderService.update(updatedOrder).subscribe(() => this.closeAllDialog())
  }

  deleteOrder = (): void => {
    if (!this.dataSource.data.id)
      return

    this.orderService.delete(this.dataSource.data.id).subscribe(() => this.closeAllDialog())
  }

  addLabelToNote(label: string): void {
    let formValue = getValueForm(this.formGroup.value.note)
    if (formValue.length === 0) {
      this.formGroup.value.note = label
      return
    }
    const nextNote = formValue + ',' + label
    this.formGroup.value.note = nextNote.length < 100 ? nextNote : formValue
  }

  removeLabelToNote(): void {
    let formValue = getValueForm(this.formGroup.value.note)
    let result = formValue.split(",")
    result.pop()
    this.formGroup.value.note = result ? result.toString() : ""
  }

  getLabels(): ReadonlyArray<Labels> { return this.labels }
}

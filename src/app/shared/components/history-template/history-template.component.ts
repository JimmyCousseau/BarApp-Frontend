import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StateService } from '../../../core/http/state.service';
import { Order } from '../../../core/Interfaces/Order';
import { OrderService } from '../../../core/http/order.service';
import { BaseTemplateComponent } from '../base-template/base-template.component';
import { State } from '../../../core/Interfaces/State';
import { getValueForm } from '../../../core/utils/common-functions';

@Component({
  selector: 'app-history-template',
  templateUrl: './history-template.component.html',
  styles: [],
})
export class HistoryTemplateComponent extends BaseTemplateComponent implements OnInit {

  @Input()
  override dataSource!: { foo: any, data: Order }

  formGroup = new FormGroup({
    amount: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(9999)]),
    state: new FormControl('', [Validators.required])
  })

  states: State[] = []

  constructor(
    protected override dialog: MatDialog,
    private orderService: OrderService,
    private stateService: StateService,
  ) {
    super(dialog)
  }

  ngOnInit(): void {
    this.stateService.findAll().subscribe((states: State[]) => {
      this.states = states
    })
    this.formGroup.setValue({
      amount: this.dataSource.data.amount,
      state: this.dataSource.data.state
    })
  }

  updateOrder(): void {
    if (!this.dataSource.data || this.formGroup.invalid)
      return
    let updatedOrder: Order = { ...this.dataSource.data }
    updatedOrder.amount = getValueForm(this.formGroup.value.amount)
    updatedOrder.state = getValueForm(this.formGroup.value.state)
    this.orderService.update(updatedOrder).subscribe(() => this.closeAllDialog())
  }

  deleteOrder = (): void => {
    console.log("o")
    if (!this.dataSource.data.id)
      return
    console.log("e")

    this.orderService.delete(this.dataSource.data.id).subscribe(() => this.closeAllDialog())
  }
}

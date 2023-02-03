import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Labels } from '../../../core/Interfaces/Labels';
import { Order } from '../../../core/Interfaces/Order';
import { LabelsService } from '../../../core/http/labels.service';
import { BaseTemplateComponent } from '../base-template/base-template.component';
import { Products } from 'src/app/core/Interfaces/Products';
import { MenuService } from 'src/app/core/http/menu.service';

@Component({
  selector: 'app-mod-prod-in-order-template',
  templateUrl: './mod-prod-in-order-template.component.html',
  styles: [],
})
export class ModProdInOrderTemplateComponent extends BaseTemplateComponent {

  @Input()
  override dataSource!: { foo: any, data: Order };

  private labels: Labels[] = []
  private products: Products[] = []

  constructor(
    protected override dialog: MatDialog,
    private labelService: LabelsService,
    private menuService: MenuService,
  ) {
    super(dialog);
    this.labelService.findAll().subscribe((labels: Labels[]) => {
      this.labels = labels
    })
    this.menuService.findAllProducts().subscribe((products: Products[]) => {
      this.products = products
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

  getPriceProduct(productName: string): any { return this.products.find((p) => p.name === productName)?.price_sold }
}

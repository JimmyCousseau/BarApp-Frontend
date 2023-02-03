import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTableTemplateComponent } from '../../app/Templates/order-table-template/order-table-template.component';

describe('OrderTableTemplateComponent', () => {
  let component: OrderTableTemplateComponent;
  let fixture: ComponentFixture<OrderTableTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderTableTemplateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrderTableTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

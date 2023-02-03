import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOrdersComponent } from '../../app/Components/map-orders/map-orders.component';

describe('MapOrdersComponent', () => {
  let component: MapOrdersComponent;
  let fixture: ComponentFixture<MapOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapOrdersComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MapOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

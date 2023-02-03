import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModProdInOrderTemplateComponent } from '../../app/Templates/mod-prod-in-order-template/mod-prod-in-order-template.component';

describe('ModProdInOrderTemplateComponent', () => {
  let component: ModProdInOrderTemplateComponent;
  let fixture: ComponentFixture<ModProdInOrderTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModProdInOrderTemplateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModProdInOrderTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

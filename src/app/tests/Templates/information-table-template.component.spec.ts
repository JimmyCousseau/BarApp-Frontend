import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationTableTemplateComponent } from '../../app/Templates/information-table-template/information-table-template.component';

describe('InformationTableTemplateComponent', () => {
  let component: InformationTableTemplateComponent;
  let fixture: ComponentFixture<InformationTableTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformationTableTemplateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InformationTableTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

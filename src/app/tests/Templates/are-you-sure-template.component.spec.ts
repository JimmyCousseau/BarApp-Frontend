import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreYouSureTemplateComponent } from '../../app/Templates/are-you-sure-template/are-you-sure-template.component';

describe('AreYouSureTemplateComponent', () => {
  let component: AreYouSureTemplateComponent;
  let fixture: ComponentFixture<AreYouSureTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreYouSureTemplateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AreYouSureTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

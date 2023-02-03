import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordTemplateComponent } from '../../app/Templates/password-template/password-template.component';

describe('PasswordTemplateComponent', () => {
  let component: PasswordTemplateComponent;
  let fixture: ComponentFixture<PasswordTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordTemplateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PasswordTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

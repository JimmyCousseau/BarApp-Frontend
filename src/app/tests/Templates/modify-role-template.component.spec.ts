import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRoleTemplateComponent } from '../../app/Templates/modify-role-template/modify-role-template.component';

describe('ModifyRoleTemplateComponent', () => {
  let component: ModifyRoleTemplateComponent;
  let fixture: ComponentFixture<ModifyRoleTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyRoleTemplateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModifyRoleTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

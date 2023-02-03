import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPencilTemplateComponent } from '../../app/Templates/set-pencil-template/set-pencil-template.component';

describe('SetPencilTemplateComponent', () => {
  let component: SetPencilTemplateComponent;
  let fixture: ComponentFixture<SetPencilTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetPencilTemplateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SetPencilTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

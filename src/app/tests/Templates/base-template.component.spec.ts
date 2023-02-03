import { TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BaseTemplateComponent } from '../../app/Templates/base-template/base-template.component';

describe('BaseTemplateComponent', () => {
  let component: BaseTemplateComponent;
  let fixture: ComponentFixture<BaseTemplateComponent>;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, NoopAnimationsModule],
      declarations: [BaseTemplateComponent]
    }).compileComponents();

    dialog = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(BaseTemplateComponent);
    component = fixture.componentInstance;
  });

  it('should close all dialogs', () => {
    spyOn(dialog, 'closeAll');
    component.closeAllDialog();
    expect(dialog.closeAll).toHaveBeenCalled();
  });

  it('should open a dialog', () => {
    const ref = {} as TemplateRef<any>;
    const foo = () => { };
    const data = {};
    spyOn(dialog, 'open');
    component.openDialog(ref, foo, data);
    expect(dialog.open).toHaveBeenCalledWith(ref, { data: { foo, data } });
  });
});

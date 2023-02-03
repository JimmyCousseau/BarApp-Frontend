import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MenuService } from '../../app/Services/ComponentService/menu.service';
import { AddProdTemplateComponent } from '../../app/Templates/add-prod-template/add-prod-template.component';
import { HttpTestingController } from '@angular/common/http/testing';

describe('AddProdTemplateComponent', () => {
  let component: AddProdTemplateComponent;
  let fixture: ComponentFixture<AddProdTemplateComponent>;
  let dialog: MatDialog;
  let snackBar: MatSnackBar;
  let menuService: MenuService;
  let httpMock: HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatSnackBarModule, ReactiveFormsModule, NoopAnimationsModule],
      declarations: [AddProdTemplateComponent],
      providers: [MenuService]
    }).compileComponents();

    dialog = TestBed.inject(MatDialog);
    snackBar = TestBed.inject(MatSnackBar);
    menuService = TestBed.inject(MenuService);
    fixture = TestBed.createComponent(AddProdTemplateComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should not call addProduct or modifyProduct if form is invalid', () => {
    component.productForm.controls.productName.setValue(null);
    component.productForm.controls.productPriceSold.setValue(null);
    component.productForm.controls.productPriceBought.setValue(null);
    component.productForm.controls.productAmount.setValue(null);
    component.productForm.controls.productNeedPreparation.setValue(null);
    spyOn(menuService, 'insertProduct');
    spyOn(menuService, 'updateProduct');
    component.productDialogResponse();
    expect(menuService.insertProduct).not.toHaveBeenCalled();
    expect(menuService.updateProduct).not.toHaveBeenCalled();
  });

})

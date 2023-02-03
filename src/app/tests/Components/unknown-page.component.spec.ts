import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { UnknownPageComponent } from '../../app/Components/unknown-page/unknown-page.component';
import { AuthService } from '../../app/core/authentification/auth.service';

describe('UnknownPageComponent', () => {
  let component: UnknownPageComponent;
  let fixture: ComponentFixture<UnknownPageComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBar,
      ],
      declarations: [
        UnknownPageComponent
      ],
      providers: [
        {
          provider: AuthService, useValue: jasmine.createSpyObj(AuthService)
        }
      ],
    });

    fixture = TestBed.createComponent(UnknownPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('should initialize', () => {
    expect(component).toBeTruthy();
  })

  it('should call verifyToken on AuthService', () => {
    spyOn(authService, 'verifyToken');
    component.ngOnInit();
    expect(authService.verifyToken).toHaveBeenCalled();
  });
});

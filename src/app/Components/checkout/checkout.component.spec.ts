import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutService } from '../../Services/ComponentService/CheckoutService';
import { AuthService } from '../../Services/Security/auth.service';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthService, CheckoutService],
      declarations: [CheckoutComponent]
    })
    .compileComponents();    
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CheckoutComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});

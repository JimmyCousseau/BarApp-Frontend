import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutService } from '../../app/core/http/checkout.service';
import { AuthService } from '../../app/core/authentification/auth.service';

import { CheckoutComponent } from '../../app/Components/checkout/checkout.component';

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

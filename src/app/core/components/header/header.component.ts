import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Dialog } from 'src/app/shared/components/dialog/Dialog';
import { AuthService } from '../../authentification/auth.service';
import { ProductService } from '../../http/product.service';
import { Products } from '../../Interfaces/Products';
import { Role } from '../../Interfaces/Role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends Dialog implements OnInit {

  role!: Role
  productsWarningAmount: Products[] = []
  hideBadge = this.productsWarningAmount ? false : true


  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router,
    protected override dialog: MatDialog,
  ) {
    super(dialog)
  }

  override ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(data => {
      this.role = this.authService.getRole()
    })
    this.authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.dialog.afterAllClosed.subscribe(() => {
          this.productService.findAll().subscribe((products: Products[]) => {
            this.productsWarningAmount = products.filter((prod) => prod.amount < 10 && !prod.need_preparation)
          })
        })
      }
    })
  }

  disconnect = (): void => {
    this.authService.disconnect()
    this.dialog.closeAll()
    this.router.navigate(['/login'])
  }

}

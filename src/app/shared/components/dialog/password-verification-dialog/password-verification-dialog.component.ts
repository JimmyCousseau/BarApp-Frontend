import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../../core/Interfaces/User';
import { AuthService } from '../../../../core/authentification/auth.service';
import { HeaderDialog } from '../header-dialog/header-dialog.component';

@Component({
  selector: 'password-verification-dialog',
  templateUrl: './password-verification-dialog.component.html',
  styles: [],
})
export class PasswordVerificationDialog extends HeaderDialog {

  @Input()
  override dataSource!: { foo: any, data: any }

  verificationIdentity = new FormGroup({
    password: new FormControl(null, [Validators.required]),
  })

  constructor(
    protected override dialog: MatDialog,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {
    super(dialog);
  }

  override redirectDialogValidation(foo: any, data: any): void {
    this.authService.verifyIdentification(this.getCurrentUser()).subscribe((response: boolean) => {
      if (response) {
        super.redirectDialogValidation(foo, data)
      }
      this.showResponseDialog(response, "Identification réussi")
      this.closeAllDialog()
    })
  }

  private getCurrentUser(): User {
    const resultForm = this.verificationIdentity?.value.password
    const password = resultForm && !this.verificationIdentity.invalid ? resultForm : ""
    const u = this.authService.getUser()
    const user: User = {
      username: u.username,
      role: u.role,
      password: password
    }
    return user
  }

  showResponseDialog(
    data: any,
    message: string,
    noObjectMessage: string = "Mauvais mot de passe, veuillez réessayer",
    falseMessage: string = "Something went wrong"
  ) {
    if (data === null)
      this.snackBar.open(noObjectMessage, "ok", { duration: 3000 });
    else if (data === false)
      this.snackBar.open(falseMessage, "ok", { duration: 3000 });
    else {
      this.snackBar.open(message, "ok", { duration: 3000 });
    }
  }

}

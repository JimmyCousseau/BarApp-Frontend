import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../Services/Security/auth.service';
import { User } from '../../Interfaces/User';
import { ParameterService } from 'src/app/Services/ComponentService/ParameterService';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  password: string = "";

  roleSelected = '';
  roleSelectedForChange = '';
  listOfRoles: any;
  currentUser: User;
  users: any;

  newPasswordForm = new FormGroup({
    oldPassword: new FormControl(null, Validators.required),
    newPassword: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
  });
  newUserForm = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
    role: new FormControl(null, Validators.required)
  })


  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private paramService: ParameterService, private dialog: MatDialog) {
    this.currentUser = this.authService.getUser();
  }

  ngOnInit(): void {
    this.roleSelected = '';
    this.paramService.getUsersList().subscribe(users => {
      this.users = users;
      this.users.forEach((user: User, i: number) => {
        if (user.Username === this.currentUser.Username) {
          this.users.splice(i, 1);
        }
      });
    });


    this.paramService.getRoleList().subscribe(roleList => {
      this.listOfRoles = roleList;
    })
  }

  submitNewPasswordForm() {
    if (this.newPasswordForm.invalid) {
      return;
    }
    const currentUser: User = {
      Username: this.currentUser.Username,
      Password: this.newPasswordForm.get('oldPassword')?.value || 'wrong',
      Role: this.currentUser.Role
    };
    this.paramService.changePassword(currentUser, this.newPasswordForm.get('newPassword')?.value || 'wrong').subscribe((data: any) => {

    });
  }

  submitNewUserForm() {
    if (this.newUserForm.invalid) {
      return;
    }
    const newUser: User = {
      Username: this.newUserForm.get('username')?.value || '',
      Role: this.newUserForm.get('role')?.value || '',
      Password: 'it doesnt matter'
    };

    const currentUser: User = {
      Username: this.currentUser.Username,
      Role: this.currentUser.Role,
      Password: this.password
    };

    this.password = '';

    this.paramService.addUser(newUser, currentUser).subscribe((data: any) => {
      if (data == null) {
        this._snackBar.open("Mauvais mot de passe, veuillez réessayer", "Ok", {
          duration: 3000,
        });
      } else {
        this._snackBar.open("Utilisateur enregistré !", "Ok", {
          duration: 3000,
        });
        this.ngOnInit();
      }
    });
    this.dialog.closeAll();
  }

  getErrorMessage(form: FormGroup): string {
    if (form.get('newPassword')?.hasError('minlength')) {
      return 'Le mot de passe doit avoir une longueur minimal de 8 caractères';
    } else if (form.get('newPassword')?.hasError('maxlength')) {
      return 'Le mot de passe ne doit pas excéder 20 caractères';
    } else if (form.get('newPassword')?.hasError('required')) {
      return ''
    } else if (form.get('username')?.hasError('minlength')) {
      return "Le nom d'utilisateur doit être supérieur à 5 caractères";
    } else if (form.get('username')?.hasError('maxlength')) {
      return "Le nom d'utilisateur ne doit pas excéder 25 caractères";
    }
    return '';
  }

  deleteUserForm(username: string, role: string): void {
    const userToDelete: User = {
      Username: username,
      Role: role,
      Password: 'it doesnt matter'
    };

    const adminUser: User = {
      Username: this.currentUser.Username,
      Role: this.currentUser.Role,
      Password: this.password
    };

    this.password = '';

    this.paramService.deleteUser(userToDelete, adminUser).subscribe((data: any) => {
      if (data == null) {
        this._snackBar.open("Mauvais mot de passe, veuillez réessayer", "Ok", {
          duration: 3000,
        });
      } else {
        this.ngOnInit();
        this._snackBar.open("Utilisateur supprimé !", "Ok", {
          duration: 3000,
        });
      }
    });
    this.dialog.closeAll();
  }

  OnNoClickDialog() {
    this.dialog.closeAll();
  }

  openPswDialog(ref: TemplateRef<any>, data: any = '') {
    this.dialog.open(ref, { data: data });
  }

  changeUsersRole(user: User, nextRole: string) {
    const adminUser = {
      Username: this.currentUser.Username,
      Role: this.currentUser.Role,
      Password: this.password
    }
    this.password = '';
    this.paramService.changeUsersRole(user, adminUser, nextRole).subscribe(data => {
      if (data === null) {
        this._snackBar.open("Mauvais mot de passe, veuillez réessayer", "Ok", {
          duration: 3000,
        });
      } else {
        this.ngOnInit();
        this._snackBar.open("Le rôle à bien été changé !", "Ok", {
          duration: 3000,
        });
      }
    });
    this.dialog.closeAll();
  }
}

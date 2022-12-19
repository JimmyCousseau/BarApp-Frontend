import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleService } from '../../Services/ComponentService/RoleService';
import { UserService } from '../../Services/ComponentService/UserService';
import { User } from '../../Interfaces/User';
import { AuthService } from '../../Services/Security/auth.service';
import { PermissionService } from '../../Services/ComponentService/PermissionService';
import { PermissionsRole } from '../../../app/Interfaces/PermissionsRole';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  private readonly defaultPerm: PermissionsRole = {
    role_id: 0, can_access_menu: false, can_access_orders: false,
    can_access_history: false, can_access_checkout: false, can_access_administration_panel: false
  }

  password: string = "";

  roleSelected = '';
  roleSelectedForChange = '';
  roleList: any;
  currentUser: User = { Username: "", Password: "", Role: "" };
  users: any;
  rolePermissions: any;
  actualPerm: PermissionsRole = this.defaultPerm

  newPasswordForm = new FormGroup({
    oldPassword: new FormControl(null, Validators.required),
    newPassword: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
  })

  newUserForm = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
    role: new FormControl(null, Validators.required)
  })

  newRoleForm = new FormGroup({
    role: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)])
  })

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private roleService: RoleService,
    private dialog: MatDialog,
    private permissionService: PermissionService,
  ) { }

  ngOnInit(): void {
    this.newUserForm.reset()
    this.newPasswordForm.reset()
    this.newRoleForm.reset()

    this.actualPerm = this.defaultPerm

    this.currentUser = AuthService.getUser();
    this.roleSelected = '';
    this.userService.findAll().subscribe(users => {
      this.users = users;
      this.users.forEach((user: User, i: number) => {
        if (user.Username === this.currentUser.Username) {
          this.users.splice(i, 1);
        }
      });
    });

    this.roleService.findAll().subscribe(roleList => {
      this.roleList = roleList;
    })

    this.permissionService.findAll().subscribe(permissions => {
      this.rolePermissions = permissions;
    })

    this.dialog.closeAll();
  }

  changePassword = (): void => {
    if (this.newPasswordForm.invalid) {
      return;
    }
    const currentUser: User = this.getCurrentUser()

    this.userService.updatePassword(currentUser, this.newPasswordForm.get('newPassword')?.value || '').subscribe(data => {
      this.showResponseDialog(data, "Mot de passe changé !")
    });
  }

  addUser = (): void => {
    if (this.newUserForm.invalid) {
      return;
    }
    const newUser: User = {
      Username: this.newUserForm.get('username')?.value || '',
      Role: this.newUserForm.get('role')?.value || '',
      Password: 'it doesnt matter'
    };
    const currentUser: User = this.getCurrentUser()

    this.userService.create(newUser, currentUser).subscribe((data: any) => {
      this.showResponseDialog(data, "Utilisateur enregistré !")
    });
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

  deleteUser = (args: any[]): void => {
    if (args.length < 2)
      return;
    const userToDelete: User = {
      Username: args[0],
      Role: args[1],
      Password: 'it doesnt matter'
    };

    const adminUser: User = this.getCurrentUser()

    this.userService.delete(userToDelete, adminUser).subscribe((data: any) => {
      this.showResponseDialog(data, "Utilisateur supprimé !")
    });
  }

  closeAllDialog() {
    this.dialog.closeAll();
  }

  @Input()
  openDialog(ref: TemplateRef<any>, funcion: (args: any[]) => void, args: any[]): void {
    this.dialog.open(ref, { data: { funcion: funcion, args: args } });
  }

  changeUsersRole = (args: any[]): void => {
    if (args.length < 1)
      return
    const adminUser: User = this.getCurrentUser()
    this.userService.updateRole(args[0], adminUser).subscribe(data => {
      this.showResponseDialog(data, "Le rôle a bien été changé !")
    });
  }

  addRole = (): void => {
    const adminUser: User = this.getCurrentUser()
    this.roleService.create(this.newRoleForm.get("role")?.value || "", adminUser).subscribe(data => {
      this.showResponseDialog(data, "Le rôle a bien été ajouté")
    })
  }

  saveRolePermissions = (args: any[]): void => {
    this.permissionService.update(args[1], this.getCurrentUser()).subscribe(data => {
      this.dialog.closeAll()
      this.ngOnInit()
    })
  }

  redirectDialogValidation(func: (args: any[]) => void, args: any[]): void {
    func(args);
  }

  getPermissionBy(role_id: number): PermissionsRole {
    const found = { ...this.rolePermissions.find((x: PermissionsRole) => x.role_id === role_id) }
    if (found != undefined)
      return found
    return this.defaultPerm
  }

  deleteRole = (args: any[]): void => {
    this.roleService.delete(args[0], this.getCurrentUser())
  }

  canAccessAdminPanel() {
    return AuthService.getPermissions().can_access_administration_panel
  }

  private showResponseDialog(data: any, message: string) {
    if (data === null) {
      this.snackBar.open("Mauvais mot de passe, veuillez réessayer", "Ok", {
        duration: 3000,
      });
    } else {
      this.ngOnInit();
      this.snackBar.open(message, "Ok", {
        duration: 3000,
      });
    }
  }

  private getCurrentUser(): User {
    const currentUser = {
      Username: this.currentUser.Username,
      Role: this.currentUser.Role,
      Password: this.password
    };
    this.password = '';
    return currentUser;
  }
}

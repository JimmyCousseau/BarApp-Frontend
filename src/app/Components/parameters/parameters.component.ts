import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleService } from '../../Services/ComponentService/role.service';
import { UserService } from '../../Services/ComponentService/user.service';
import { User, UserProxy } from '../../Interfaces/User';
import { AuthService } from '../../Services/Security/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from '../../Interfaces/Role';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  private readonly defaultPerm: Role = {
    role: "",
    access_administration_panel: false,
    access_menu: false,
    access_kitchen: false,
    access_checkout: false,
    access_history: false,
    access_orders: false,
    access_statistics: false,
  }
  permFound: Role = this.defaultPerm

  displayedColumns = ['name', 'role', 'actions']
  displayedColumnsPermissions = ['permission', 'value']
  dataUsers!: MatTableDataSource<any>

  password: string = "";

  roleSelected = '';
  roleSelectedForChange = '';
  roleList: any;
  currentUser: UserProxy = { username: "", role: "" };
  rolePermissions: any;

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
  ) { }

  ngOnInit(): void {
    this.newUserForm.reset()
    this.newPasswordForm.reset()
    this.newRoleForm.reset()

    this.roleSelected = '';
    this.currentUser = AuthService.getUser();

    this.userService.findAll().subscribe(users => {
      let u = <any>users
      u.forEach((user: UserProxy, i: number) => {
        if (user.username === this.currentUser.username) {
          u.splice(i, 1)
        }
      })
      this.dataUsers = new MatTableDataSource(u)
    });

    this.roleService.findAll().subscribe(roleList => {
      this.roleList = roleList;
    })

    this.roleService.findAll().subscribe(permissions => {
      this.rolePermissions = permissions;
    })

    this.dialog.closeAll();
  }

  changePassword = (): void => {
    if (this.newPasswordForm.invalid)
      return;

    this.userService.updatePassword(this.getCurrentUser(), this.newPasswordForm.get('newPassword')?.value || '').subscribe(data => {
      this.showResponseDialog(data, "Mot de passe changé !")
    });
  }

  addUser = (): void => {
    if (this.newUserForm.invalid) {
      return;
    }
    const newUser: UserProxy = {
      username: this.newUserForm.get('username')?.value || '',
      role: this.newUserForm.get('role')?.value || '',
    };
    const currentUser: UserProxy = this.getCurrentUser()

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
    } else if (form.get('role')?.hasError('minlength')) {
      return "Le nom du rôle doit être supérieur à 3 caractères"
    } else if (form.get('role')?.hasError('maxlength')) {
      return "Le nom du rôle ne doit pas excèder 25 caractères"
    }
    return '';
  }

  deleteUser = (args: any[]): void => {
    if (args.length < 2)
      return;
    const userToDelete: UserProxy = {
      username: args[0],
      role: args[1],
    }

    const adminUser: User = this.getCurrentUser()

    this.userService.delete(userToDelete, adminUser).subscribe((data: any) => {
      this.showResponseDialog(data, "Utilisateur supprimé !")
    })
  }

  closeAllDialog() {
    this.dialog.closeAll();
  }

  @Input()
  openDialog(ref: TemplateRef<any>, funcion: (args: any[]) => void, form: FormGroup | undefined, args: any[]): void {
    if (form !== undefined && form.invalid)
      this.snackBar.open("Le formulaire n'est pas valide")
    else
      this.dialog.open(ref, { data: { funcion: funcion, args: args } });
  }

  changeUsersRole = (args: any[]): void => {
    if (args.length < 1)
      return
    const adminUser: UserProxy = this.getCurrentUser()
    this.userService.updateRole(args[0], adminUser).subscribe(data => {
      this.showResponseDialog(data, "Le rôle a bien été changé !")
    });
  }

  addRole = (): void => {
    if (this.newRoleForm.invalid)
      return
    const adminUser: UserProxy = this.getCurrentUser()
    this.roleService.create(this.newRoleForm.get("role")?.value || "", adminUser).subscribe(data => {
      this.showResponseDialog(data, "Le rôle a bien été ajouté")
    })
  }

  saveRolePermissions = (args: any[]): void => {
    this.roleService.update(JSON.parse(JSON.stringify(this.permFound)) as Role, this.getCurrentUser()).subscribe((data) => {
      this.showResponseDialog(data, "Les permissions ont bien été changé")
    })
  }

  redirectDialogValidation(func: (args: any[]) => void, args: any[]): void {
    func(args);
  }

  getPermissionBy(role: string): any {
    this.permFound = this.rolePermissions.find((x: Role) => x.role === role)
    if (this.permFound !== undefined) {
      this.permFound = JSON.parse(JSON.stringify(this.permFound))
      return this.permFound
    }

    let d = this.defaultPerm
    d.role = role
    this.permFound = JSON.parse(JSON.stringify(d))
    return this.permFound
  }

  setFoundPermissions(perm: any) {
    let temp = JSON.parse(JSON.stringify(this.permFound))
    temp[perm] = !temp[perm]
    this.permFound = temp
    return temp[perm]
  }

  deleteRole = (args: any[]): void => {
    this.roleService.delete(args[0], this.getCurrentUser()).subscribe((data) => {
      this.showResponseDialog(data, "Le rôle a bien été supprimé", undefined, "Un utilisateur utilise ce rôle, vous ne pouvez pas le supprimer")
    })
  }

  canAccessAdminPanel() {
    return AuthService.getRole().access_administration_panel
  }

  getPermissions(permissions: { key: string, value: string }[]) {
    permissions = permissions.filter((elem) => elem.key !== 'role')
    return new MatTableDataSource(permissions)
  }

  private showResponseDialog(
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
      this.ngOnInit();
      this.snackBar.open(message, "ok", { duration: 3000 });
    }
  }

  private getCurrentUser(): User {
    const currentUser = {
      username: this.currentUser.username,
      role: this.currentUser.role,
      password: this.password,
    };
    this.password = '';
    return currentUser;
  }
}

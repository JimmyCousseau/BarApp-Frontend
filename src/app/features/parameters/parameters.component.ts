import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../core/authentification/auth.service';
import { LabelsService } from '../../core/http/labels.service';
import { RoleService } from '../../core/http/role.service';
import { UserService } from '../../core/http/user.service';
import { Labels } from '../../core/Interfaces/Labels';
import { Products } from '../../core/Interfaces/Products';
import { Role } from '../../core/Interfaces/Role';
import { User, UserProxy } from '../../core/Interfaces/User';
import { getValueForm, showResponseDialog } from '../../core/utils/common-functions';
import { BasicProductService } from '../../core/http/basic-product.service';
import { ProductService } from '../../core/http/product.service';
import { BasicProducts } from '../../core/Interfaces/BasicProducts';
import { Dialog } from '../../shared/components/dialog/Dialog';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss'],
})
export class ParametersComponent extends Dialog implements OnInit {

  dataUsers!: MatTableDataSource<UserProxy>
  dataProducts!: MatTableDataSource<Products>

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  roleList: Role[] = []
  currentUser: UserProxy = { username: "", role: "" };
  labels: Labels[] = []
  basicProducts: BasicProducts[] = []

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

  currentIp: string = ''

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private authService: AuthService,
    private labelService: LabelsService,
    private productService: ProductService,
    private BasicProductService: BasicProductService,
    private snackBar: MatSnackBar,
    protected override dialog: MatDialog,
  ) {
    super(dialog)
  }

  override ngOnInit(): void {
    this.newUserForm.reset()
    this.newPasswordForm.reset()
    this.newRoleForm.reset()

    this.currentUser = this.authService.getUser();

    this.userService.findAll().subscribe((users: UserProxy[]) => {
      users.forEach((user: UserProxy, i: number) => {
        if (user.username === this.currentUser.username) {
          users.splice(i, 1)
        }
      })
      this.dataUsers = new MatTableDataSource(users)
    });

    this.roleService.findAll().subscribe((roleList: Role[]) => {
      this.roleList = roleList;
    })

    this.productService.findAll().subscribe((products: Products[]) => {
      this.dataProducts = new MatTableDataSource(products)
      this.dataProducts.paginator = this.paginator
      this.dataProducts.sort = this.sort
    })

    this.labelService.findAll().subscribe((labels: Labels[]) => {
      this.labels = labels
    })

    this.BasicProductService.findAll().subscribe((products: BasicProducts[]) => {
      this.basicProducts = products
    })

    this.currentIp = "Change me"
  }

  changePassword = (): void => {
    if (this.newPasswordForm.invalid)
      return;

    this.userService.updatePassword(this.getCurrentUser(), getValueForm(this.newPasswordForm.value.newPassword)).subscribe(data => {
      showResponseDialog(this.snackBar, data, "Mot de passe changé !")
    });
  }

  addUser = (): void => {
    console.log("ICI")
    if (this.newUserForm.invalid) {
      console.log("INVALID")
      return
    }
    console.log("OK")
    const newUser: UserProxy = {
      username: getValueForm(this.newUserForm.value.username),
      role: getValueForm(this.newUserForm.value.role),
    };
    console.log(newUser);

    this.userService.insert(newUser).subscribe((data: any) => {
      console.log(data)
      showResponseDialog(this.snackBar, data, "Utilisateur enregistré !")
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

    this.userService.delete(userToDelete.username).subscribe((data: any) => {
      showResponseDialog(this.snackBar, data, "Utilisateur supprimé !")
    })
  }

  changeUsersRole = (args: any[]): void => {
    if (args.length < 1)
      return
    const user = args[0]

    this.userService.updateRole(user).subscribe(data => {
      showResponseDialog(this.snackBar, data, "Le rôle a bien été changé !")
    });
  }

  addRole = (): void => {
    if (this.newRoleForm.invalid)
      return
    this.roleService.insert(this.newRoleForm.get("role")?.value || "").subscribe(data => {
      showResponseDialog(this.snackBar, data, "Le rôle a bien été ajouté")
    })
  }

  canAccessAdminPanel() { return this.authService.getRole().access_administration_panel }

  sortData(sort: Sort) {
    const data = this.dataProducts.data.slice()

    this.dataProducts.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc'
      if (sort.active === 'name')
        return this.compare(a.name, b.name, isAsc)
      else if (sort.active === 'amount')
        return this.compare(a.amount, b.amount, isAsc)
      else if (sort.active === 'preparation')
        return this.compare(Number(a.need_preparation), Number(b.need_preparation), isAsc)
      else
        return 0
    })
  }

  private compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
  }

  private getCurrentUser(): User {
    const currentUser = {
      username: this.currentUser.username,
      role: this.currentUser.role,
      password: getValueForm(this.newPasswordForm.value.oldPassword),
    };
    return currentUser;
  }
}

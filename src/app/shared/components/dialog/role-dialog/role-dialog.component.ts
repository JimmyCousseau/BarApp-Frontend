import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '../../../../core/Interfaces/Role';
import { RoleService } from '../../../../core/http/role.service';
import { showResponseDialog } from '../../../../core/utils/common-functions';
import { HeaderDialog } from '../header-dialog/header-dialog.component';

@Component({
  selector: 'role-dialog',
  templateUrl: './role-dialog.component.html',
  styles: [],
})
export class RoleDialog extends HeaderDialog {

  @Input()
  override dataSource: any

  constructor(
    protected override dialog: MatDialog,
    private roleService: RoleService,
    private snackBar: MatSnackBar,
  ) {
    super(dialog);
  }

  saveRolePermissions = (): void => {
    this.roleService.update(JSON.parse(JSON.stringify(this.dataSource.data)) as Role).subscribe((data) => {
      showResponseDialog(this.snackBar, data, "Les permissions ont bien été changé")
      this.dialog.closeAll()
    })
  }

  deleteRole = (): void => {
    this.roleService.delete(this.dataSource.data.role).subscribe((data) => {
      showResponseDialog(this.snackBar, data, "Le rôle a bien été supprimé", undefined, "Un utilisateur utilise ce rôle, vous ne pouvez pas le supprimer")
      this.dialog.closeAll()
    })
  }

  getData(): any {
    let data = { ...this.dataSource.data }
    delete data['role']
    return data
  }

  changePermission(permKey: string): any {
    this.dataSource.data[permKey] = !this.dataSource.data[permKey]
    return this.dataSource.data[permKey]
  }

}

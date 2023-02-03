import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../core/authentification/auth.service';

@Component({
  selector: 'app-unknown-page',
  templateUrl: './unknown-page.component.html',
  styleUrls: ['./unknown-page.component.scss'],
})
export class UnknownPageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.dialog.closeAll();
    this.authService.verifyToken()
  }
}

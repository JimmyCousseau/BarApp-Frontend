import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../Services/Security/auth.service';
import { Order } from '../../Interfaces/Order';
import { HistoryService } from '../../Services/ComponentService/HistoryService';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {

  historyContent: Order[] | undefined;

  constructor(
    private historyService: HistoryService,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.historyService.findAllBy(AuthService.getUser().Username).subscribe(data => {
      this.historyContent = data;
    });
  }

  closeAllDialog() { this.dialog.closeAll(); }

  openActionDialog(ref: TemplateRef<any>, data: Order) {
    this.dialog.open(ref, { data: data })
  }

}

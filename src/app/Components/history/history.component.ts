import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort, Sort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Order } from '../../Interfaces/Order'
import { HistoryService } from '../../Services/ComponentService/history.service'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})

export class HistoryComponent implements OnInit {

  historyContent!: Order[]
  dataSource!: MatTableDataSource<Order>
  displayedColumns = ['date', 'table', 'serveur']

  constructor(
    private historyService: HistoryService,
    private dialog: MatDialog,
  ) {

  }

  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngOnInit(): void {
    this.historyService.findAll().subscribe(data => {
      this.historyContent = data
      this.dataSource = new MatTableDataSource<Order>(data)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice()
    if (!sort.active || sort.direction === '') {
      this.historyContent = data
      return
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc'
      if (sort.active === 'date')
        return this.compare(a.date, b.date, isAsc)
      else if (sort.active === 'table')
        return this.compare(a.table_id, b.table_id, isAsc)
      else if (sort.active === 'serveur')
        return this.compare(a.waiter, b.waiter, isAsc)
      else if (sort.active === 'intitule')
        return this.compare(a.name, b.name, isAsc)
      else if (sort.active === 'quantite')
        return this.compare(a.amount, b.amount, isAsc)
      else if (sort.active === 'etat')
        return this.compare(a.state, b.state, isAsc)
      else
        return 0
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  closeAllDialog() { this.dialog.closeAll() }

  openActionDialog(ref: TemplateRef<any>, data: Order) {
    this.dialog.open(ref, { data: data })
  }

  private compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
  }

}

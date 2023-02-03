import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';

import { Order } from '../../app/core/Interfaces/Order';
import { HistoryService } from '../../app/Services/ComponentService/history.service';
import { HistoryComponent } from '../../app/Components/history/history.component';

const testOrders: Order[] = [
  { date: new Date(), table_id: 1, waiter: 'waiter1', name: 'beer', amount: 3, state: 'En attente', note: "", price: 0 },
  { date: new Date(), table_id: 2, waiter: 'waiter2', name: 'beer', amount: 3, state: 'En attente', note: "", price: 0 },
  { date: new Date(), table_id: 3, waiter: 'waiter3', name: 'beer', amount: 3, state: 'En attente', note: "", price: 0 },
];

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let historyService: HistoryService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryComponent],
      providers: [
        { provide: HistoryService, useValue: { findAll: () => of(testOrders) } },
        { provide: MatDialog, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    historyService = TestBed.inject(HistoryService);
    fixture.detectChanges();
  });

  it('should call historyService.findAll() on ngOnInit', () => {
    spyOn(historyService, 'findAll');
    component.ngOnInit();
    expect(historyService.findAll).toHaveBeenCalled();
  });

  it('should set dataSource and paginator on ngOnInit', () => {
    expect(component.dataSource).toEqual(jasmine.any(MatTableDataSource));
    expect(component.dataSource.data).toEqual(testOrders);
  });

  it('should filter data on applyFilter()', () => {
    const filterValue = 'waiter1';
    const event = { target: { value: filterValue } } as unknown as Event;
    component.applyFilter(event);
    expect(component.dataSource.filter).toEqual(filterValue.trim().toLowerCase());
  });

});

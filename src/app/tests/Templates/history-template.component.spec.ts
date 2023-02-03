import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTemplateComponent } from '../../app/Templates/history-template/history-template.component';

describe('HistoryTemplateComponent', () => {
  let component: HistoryTemplateComponent;
  let fixture: ComponentFixture<HistoryTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryTemplateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HistoryTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

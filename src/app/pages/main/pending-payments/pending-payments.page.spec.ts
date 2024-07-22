import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PendingPaymentsPage } from './pending-payments.page';

describe('PendingPaymentsPage', () => {
  let component: PendingPaymentsPage;
  let fixture: ComponentFixture<PendingPaymentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPaymentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

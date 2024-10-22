import { TestBed } from '@angular/core/testing';

import { PendingPaymentsService } from './pending-payments.service';

describe('PendingPaymentsService', () => {
  let service: PendingPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingPaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ServiceRequerimentsService } from './service-requeriments.service';

describe('ServiceRequerimentsService', () => {
  let service: ServiceRequerimentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRequerimentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UprisingsService } from './uprisings.service';

describe('UprisingsService', () => {
  let service: UprisingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UprisingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

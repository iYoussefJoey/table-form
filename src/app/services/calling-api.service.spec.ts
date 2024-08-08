import { TestBed } from '@angular/core/testing';

import { CallingApiService } from './calling-api.service';

describe('CallingApiService', () => {
  let service: CallingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

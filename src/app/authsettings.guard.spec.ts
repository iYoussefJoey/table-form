import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authsettingsGuard } from './authsettings.guard';

describe('authsettingsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authsettingsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

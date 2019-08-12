import { TestBed, async, inject } from '@angular/core/testing';

import { AuthDetailGuard } from './auth-detail.guard';

describe('AuthDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthDetailGuard]
    });
  });

  it('should ...', inject([AuthDetailGuard], (guard: AuthDetailGuard) => {
    expect(guard).toBeTruthy();
  }));
});

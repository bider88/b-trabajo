import { TestBed, async, inject } from '@angular/core/testing';

import { IsRecruiterGuard } from './is-recruiter.guard';

describe('IsRecruiterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsRecruiterGuard]
    });
  });

  it('should ...', inject([IsRecruiterGuard], (guard: IsRecruiterGuard) => {
    expect(guard).toBeTruthy();
  }));
});

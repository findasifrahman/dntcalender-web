import { TestBed } from '@angular/core/testing';

import { ForeignCourceService } from './foreign-cource.service';

describe('ForeignCourceService', () => {
  let service: ForeignCourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForeignCourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

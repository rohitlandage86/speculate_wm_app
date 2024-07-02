import { TestBed } from '@angular/core/testing';

import { GamblerService } from './gambler.service';

describe('GamblerService', () => {
  let service: GamblerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamblerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

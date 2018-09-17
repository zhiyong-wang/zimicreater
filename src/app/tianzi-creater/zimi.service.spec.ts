import { TestBed, inject } from '@angular/core/testing';

import { ZimiService } from './zimi.service';

describe('ZimiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZimiService]
    });
  });

  it('should be created', inject([ZimiService], (service: ZimiService) => {
    expect(service).toBeTruthy();
  }));
});

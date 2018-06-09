import { TestBed, inject } from '@angular/core/testing';

import { GardenerService } from './gardener.service';

describe('GardenerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GardenerService]
    });
  });

  it('should be created', inject([GardenerService], (service: GardenerService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { MCIService } from './mci';

describe('Mci', () => {
  let service: MCIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MCIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

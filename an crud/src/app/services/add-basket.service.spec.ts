import { TestBed } from '@angular/core/testing';

import { AddBasketService } from './add-basket.service';

describe('AddBasketService', () => {
  let service: AddBasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddBasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

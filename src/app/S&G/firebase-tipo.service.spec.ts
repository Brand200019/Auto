import { TestBed } from '@angular/core/testing';

import { FirebaseTipoService } from './firebase-tipo.service';

describe('FirebaseTipoService', () => {
  let service: FirebaseTipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseTipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FirebaseViajeService } from './firebase-viaje.service';

describe('FirebaseViajeService', () => {
  let service: FirebaseViajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseViajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

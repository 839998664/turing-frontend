import { TestBed } from '@angular/core/testing';

import { HttpSvcService } from './http-svc.service';

describe('HttpSvcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpSvcService = TestBed.get(HttpSvcService);
    expect(service).toBeTruthy();
  });
});

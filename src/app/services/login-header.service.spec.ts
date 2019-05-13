import { TestBed, inject } from '@angular/core/testing';

import { LoginHeaderService } from './login-header.service';

describe('LoginHeaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginHeaderService]
    });
  });

  it('should be created', inject([LoginHeaderService], (service: LoginHeaderService) => {
    expect(service).toBeTruthy();
  }));
});

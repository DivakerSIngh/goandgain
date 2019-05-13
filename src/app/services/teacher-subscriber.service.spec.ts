import { TestBed, inject } from '@angular/core/testing';

import { TeacherSubscriberService } from './teacher-subscriber.service';

describe('TeacherSubscriberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeacherSubscriberService]
    });
  });

  it('should be created', inject([TeacherSubscriberService], (service: TeacherSubscriberService) => {
    expect(service).toBeTruthy();
  }));
});

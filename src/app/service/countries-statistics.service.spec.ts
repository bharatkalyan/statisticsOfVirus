import { TestBed } from '@angular/core/testing';

import { StatisticsCountriesService } from './countries-statisctics.service';

describe('CountriesService', () => {
  let service: StatisticsCountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsCountriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

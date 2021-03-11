import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsCountriesComponent } from './countries-statistics.component';

describe('StatisticsCountriesComponent', () => {
  let component: StatisticsCountriesComponent;
  let fixture: ComponentFixture<StatisticsCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

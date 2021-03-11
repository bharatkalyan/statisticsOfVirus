import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StatisticsCountriesComponent } from './countries-statistics/countries-statistics.component';
import { HttpClientModule } from '@angular/common/http';
import { StatisticsCountriesService } from './service/countries-statisctics.service';

@NgModule({
  declarations: [
    AppComponent,
    StatisticsCountriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [StatisticsCountriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

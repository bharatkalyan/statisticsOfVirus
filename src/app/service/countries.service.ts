import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private https: HttpClient) { }

  public getMultipleCountries(): Observable<any>{
  let URL = "";
  URL = "https://corona.lmao.ninja/v2/countries/ India, Nepal, Bangladesh, Pakistan, Bhutan, Sri Lanka, Maldives";
  
  return this.https.get<any>(URL).pipe(
    catchError((error) => {
      return throwError({
        status: error.status,
        error: { message: error.message },
      });
    })
  );
}
}

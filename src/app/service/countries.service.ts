import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { environment} from "../../environments/environment"
@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private https: HttpClient) { }

  public getMultipleCountries(): Observable<any>{
  const URL = environment.getMultipleCountries;
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

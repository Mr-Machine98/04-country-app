import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountryResponse } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://api.restcountries.com/countries/v5';

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    return this.http.get<RESTCountryResponse>(
      `${API_URL}/capitals`, { 
        headers: { 'Authorization': 'Bearer rc_live_d7bd22e9443147b0ab74d71848d565cc' },
        params: {'q': query}
      }
    ).pipe(
      map(restCountry => CountryMapper.mapRestCountryArrayToCountryArray(restCountry.data.objects)),
      catchError( error => {
        console.error('Error fetching', error);
        return throwError(() => new Error(`It could not get countries using that query: ${query}`));
      })
    );
  }

  searchByCountry(query: string) {
    query = query.toLowerCase();
    return this.http.get<RESTCountryResponse>(
      `${API_URL}/name`, { 
        headers: { 'Authorization': 'Bearer rc_live_d7bd22e9443147b0ab74d71848d565cc' },
        params: {'q': query}
      }
    ).pipe(
      map(restCountry => CountryMapper.mapRestCountryArrayToCountryArray(restCountry.data.objects)),
      delay(2000),
      catchError( error => {
        console.error('Error fetching', error);
        return throwError(() => new Error(`It could not get countries using that query: ${query}`));
      })
    );
  }

  searchCountryByAlphaCode(code: string) {
    code = code.toLowerCase();
    return this.http.get<RESTCountryResponse>(
      `${API_URL}/code`, { 
        headers: { 'Authorization': 'Bearer rc_live_d7bd22e9443147b0ab74d71848d565cc' },
        params: {'q': code}
      }
    ).pipe(
      map(restCountry => CountryMapper.mapRestCountryArrayToCountryArray(restCountry.data.objects)),
      map(countries => countries.at(0)),
      catchError( error => {
        console.error('Error fetching', error);
        return throwError(() => new Error(`It could not get countries using that code: ${code}`));
      })
    );
  }

}

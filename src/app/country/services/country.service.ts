import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const API_URL = 'https://api.restcountries.com/countries/v5';

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital(query: string) {
    query = query.toLowerCase();
    return this.http.get(
      `${API_URL}`, { 
        headers: { 'Authorization': 'Bearer rc_live_d7bd22e9443147b0ab74d71848d565cc' },
        params: {'q': query}
      }
    );
  }

}

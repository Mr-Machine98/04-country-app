import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html'
})
export class ByCountryPage {
  query = signal('');
  countryService = inject(CountryService);

  // con resources 
  // countryResource = rxResource({
  //   request: () => ({query: this.query()}),
  //   loader: async({request}) => {
  //     console.log("Preparados para llamar el servicio");
  //     if (!request.query) return [];
  //     return firstValueFrom(this.countryService.searchByCountry(request.query));
  //   }
  // });

  // Con resources con rxjs
  countryResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({request}) => {
      if (!request.query) return of([]);
      return this.countryService.searchByCountry(request.query);
    }
  });

}

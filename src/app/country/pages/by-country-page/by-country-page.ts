import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html'
})
export class ByCountryPage {

  activatedRoute = inject(ActivatedRoute); 
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = signal(this.queryParam);
  countryService = inject(CountryService);
  router = inject(Router); // Importamos router para poder modificar la url mientras el usuario typea en la caja de texto se ve reflejado en la url

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
      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: request.query
        }
      });
      return this.countryService.searchByCountry(request.query);
    }
  });

}

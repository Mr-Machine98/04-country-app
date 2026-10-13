import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html'
})
export class ByCapitalPage {

  
  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute); 
  // Obtenemos el valor del query param 'query' de la URL, si no existe, usamos un string vacío
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = signal(this.queryParam);
  router = inject(Router); // Importamos router para poder modificar la url mientras el usuario typea en la caja de texto se ve reflejado en la url
  
  // Este es un recurso de angular 20 para arriba, que nos permite hacer una especie de "state management" 
  // de manera más sencilla
  // y con menos código, ya que nos permite manejar el estado de una manera más declarativa y reactiva
  // asincronismo
  capitalResource = resource({
    // request es una función que devuelve un objeto con los parámetros que queremos pasar al loader
    request: () => ({query: this.query()}),
    // loader es una función que recibe un objeto con los parámetros que le pasamos en request
    // y devuelve una promesa con el resultado de la operación asincrónica
    // en este caso, el loader hace una llamada al servicio de país para buscar los países por capital
    loader: async({request}) => {
      // Si no hay query, devolvemos un array vacío
      if (!request.query) return []; // Si no hay query, devolvemos un array vacío

      // Agregamos al URL lo que escribimos en la caja de texto
      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query
        }
      });

      // Si hay query, hacemos la llamada al servicio de país para buscar los países por capital
      // Usamos firstValueFrom para convertir el observable que devuelve el servicio en una promesa
      return firstValueFrom(this.countryService.searchByCapital(request.query));
    }
  });

  // Comentaremos todo este coidgo para poder un recurso nuevo de angular 20 para arriba
  // llamado recurso
  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearchCapital(query: string): void {
    
  //   if (this.isLoading()) return;
    
  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService
  //     .searchByCapital(query)
  //     .subscribe({
  //       next: (countries) => {
  //         this.isLoading.set(false);
  //         this.countries.set(countries);
  //       },
  //       error: (err) => {
  //         this.isLoading.set(false);
  //         this.countries.set([]);
  //         this.isError.set(err);
  //       }
  //     });
  // }
  
}

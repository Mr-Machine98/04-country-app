import { Component, inject, signal } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html'
})
export class ByCapitalPage {

  countryService = inject(CountryService);
  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  onSearchCapital(query: string): void {
    
    if (this.isLoading()) return;
    
    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService
      .searchByCapital(query)
      .subscribe({
        next: (countries) => {
          this.isLoading.set(false);
          this.countries.set(countries);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.countries.set([]);
          this.isError.set(err);
        }
      });
  }
  
}

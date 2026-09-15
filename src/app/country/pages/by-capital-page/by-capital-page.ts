import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html'
})
export class ByCapitalPage {

  countryService = inject(CountryService);

  onSearchCapital(query: string): void {
    this.countryService.searchByCapital(query).subscribe(res => console.log(res));
    console.log({query})
  }
  
}

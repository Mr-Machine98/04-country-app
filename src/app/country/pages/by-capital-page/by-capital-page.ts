import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html'
})
export class ByCapitalPage {

  receivedCapital(value: string): void {
    console.log({value})
  }
  
}

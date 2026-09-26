import { Component } from '@angular/core';

import { SearchInput } from '../../components/search-input/search-input';

@Component({
  selector: 'app-by-country-page',
  imports: [ SearchInput],
  templateUrl: './by-country-page.html'
})
export class ByCountryPage {

  receivedCountry(value: string): void {
    console.log({ value })
  }
}

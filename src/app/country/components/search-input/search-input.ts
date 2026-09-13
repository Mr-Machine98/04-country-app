import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html'})
export class SearchInput {

  emitSearch = output<string>();
  placeholder = input('Search');

}

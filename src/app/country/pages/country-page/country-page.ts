import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from '../../../shared/components/not-found-component/not-found-component';
import { CountryInformationComponent } from './country-information-component/country-information-component';

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.html'
})
export class CountryPage {
  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);
  countryResource = rxResource({
    request: () => ({code: this.countryCode}),
    loader: ({request}) => {
      return this.countryService.searchCountryByAlphaCode(request.code);
    }
  });
}

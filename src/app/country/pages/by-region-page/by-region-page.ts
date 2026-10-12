import {Component, inject, signal } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryList } from '../../components/country-list/country-list';
import { Region, regions } from '../../utils/CountryUtils';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.html',
  imports: [CountryList]
})
export class ByRegionPage {
  
  selectedRegion = signal<Region | null>(null);
  countryService = inject(CountryService);
  regions : Region[] = regions;

  countryResource = rxResource({
    request: () => ({query: this.selectedRegion()}),
    loader: ({request}) => {
      if (!request.query) return of([]);
      return this.countryService.searchByRegion(request.query);
    }
  });

}

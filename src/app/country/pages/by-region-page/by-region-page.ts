import {Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryList } from '../../components/country-list/country-list';
import { Region, regions } from '../../utils/CountryUtils';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();
  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic'
  };
  return validRegions[queryParam] || 'Africa';
}

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.html',
  imports: [CountryList]
})
export class ByRegionPage {
  
  activatedRoute = inject(ActivatedRoute); 
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  query = signal(this.queryParam)
  selectedRegion = linkedSignal<Region>(() => validateQueryParam(this.queryParam));
  countryService = inject(CountryService);
  regions : Region[] = regions;
  router = inject(Router);

  countryResource = rxResource({
    request: () => ({query: this.selectedRegion()}),
    loader: ({request}) => {
      if (!request.query) return of([]);
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: request.query
        }
      });
      return this.countryService.searchByRegion(request.query);
    }
  });

}

import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
export class CountryMapper {
    
    static mapRestCountryToCountry(restCountry: RESTCountry): Country {
        return {
            capital: restCountry.capitals.map(c => c.name).join(','),
            emoji: restCountry.flag.emoji,
            cca2: restCountry.codes.alpha_2,
            flagSvg: restCountry.flag.url_svg,
            name: restCountry.names.translations['spa'].common ?? 'No Spanish Name',
            population: restCountry.population
        };
    }
    
    static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
        return restCountries.map(this.mapRestCountryToCountry);
    }

}
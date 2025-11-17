import { CountryISO } from "ngx-intl-tel-input";

export interface PhoneNumber {
number: string;             // full number
  internationalNumber: string;
  nationalNumber: string;
  e164Number: string;
  countryCode: CountryISO;    // CountryISO.Egypt or CountryISO.SaudiArabia
  dialCode: string;    
}

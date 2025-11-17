import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import cities from '../../../../public/api/cities_lite.json';
import districts from '../../../../public/api/districts_lite.json';
import regions from '../../../../public/api/regions_lite.json';
import { environment } from '../../../environments/environment';
import { PhoneNumber } from '../../pages/dashboard/main/owner/models/phoneNumber';
import { CountryISO } from 'ngx-intl-tel-input';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  http: HttpClient = inject(HttpClient);

  getAllNationality() {
    return this.http.get('/api/nationalities.json');
  }

  getAllRelations() {
    return this.http.get('/api/relations.json');
  }

  getAllfinancialData(pagination: any) {
    return this.http.post(
      environment.apiUrl + '/FinancialAccount/GetList',
      pagination
    );
  }

  allCities = cities;
  allDistricts = districts;
  allRegions = regions;

  getAllPages(pageIndex: any, pageSize: any) {
    return this.http.get(
      environment.apiUrl + `/Pages?PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }

  getAllPermissions(pageIndex: any, pageSize: any) {
    return this.http.get(
      environment.apiUrl +
        `/Actions?PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }

  getAllGroups() {
    return this.http.get(environment.apiUrl + `/Groups?PageIndex=0&PageSize=0`);
  }

parsePhoneNumber(fullNumber: string): PhoneNumber {
  if (!fullNumber) return {
    number: '',
    nationalNumber: '',
    e164Number: '',
    internationalNumber: '',
    countryCode: CountryISO.Egypt,
    dialCode: '20',
  };

  let country = CountryISO.Egypt;
  let dialCode = '20';

  if (fullNumber.startsWith('+966')) {
    country = CountryISO.SaudiArabia;
    dialCode = '966';
  } else if (fullNumber.startsWith('+20')) {
    country = CountryISO.Egypt;
    dialCode = '20';
  }

  const nationalNumber = fullNumber.replace(`+${dialCode}`, '');

  return {
    number: nationalNumber,
    nationalNumber: nationalNumber,
    e164Number: fullNumber,
    internationalNumber: fullNumber,
    countryCode: country,
    dialCode: dialCode,
  };
}




  
}

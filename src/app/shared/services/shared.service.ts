import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import cities from '../../../../public/api/cities_lite.json';
import districts from '../../../../public/api/districts_lite.json';
import regions from '../../../../public/api/regions_lite.json';
import { environment } from '../../../environments/environment';
import { PhoneNumber } from '../../pages/dashboard/main/owner/models/phoneNumber';
import { CountryISO } from 'ngx-intl-tel-input';
import { Observable } from 'rxjs';
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
  getBanksJson():Observable<any>{
    return this.http.get('/api/banks.json');
  }

  parsePhoneNumber(fullNumber: string): PhoneNumber {
    if (!fullNumber)
      return {
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

  // get Date time now
  getDateTimeNow() {
     const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  // get date now
  getTodayDate(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// get previous year
getPreviousYearDate(): string {
  const today = new Date();

  const year = today.getFullYear() - 1; // 🔥 previous year
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}


}

import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class EditorialCreditsService extends BasehttpservicesService {

  // /AccountOpeningBalance/GetList
  getEditorialCreditsList(payload: any) {
    return this.post('/AccountOpeningBalance/GetList' , payload);
  }

  // /AccountOpeningBalance/Filter
  filterEditorialCredits(payload: any) {
    return this.post('/AccountOpeningBalance/Filter' , payload);
  }

  // /AccountOpeningBalance/UpdateList
  updateEditorialCredits(payload: any) {
    return this.put('/AccountOpeningBalance/UpdateList' , payload);
  }
}

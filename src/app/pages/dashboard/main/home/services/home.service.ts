import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';
import { Observable } from 'rxjs';
import { Home } from '../interfaces/home';

@Injectable({
  providedIn: 'root',
})
export class HomeService extends BasehttpservicesService {
  getDashboard():Observable<Home> {
    return this.get('/Dashboard');
  }
}

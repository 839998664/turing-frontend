import { Injectable } from '@angular/core';
import { HttpSvcService } from './http-svc.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpService: HttpSvcService) { }

  getCustomerProfile = () => {
    return this.httpService.get(`/customer`);
  }
  updateCustomerProfile = (customer) => {
    return this.httpService.put(`/customers/address`, customer);
  }
}

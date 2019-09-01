import { Injectable } from '@angular/core';
import { HttpSvcService } from './http-svc.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpService: HttpSvcService) { }

  createOrder = (cart_id, shipping_id, tax_id) => {
    return this.httpService.post(`/orders`, { cart_id, shipping_id, tax_id});
  }
  getOrder = (order_id) => {
    return this.httpService.get(`/orders/${order_id}`);
  }
}

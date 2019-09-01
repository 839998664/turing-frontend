import { Injectable } from '@angular/core';
import { HttpSvcService } from './http-svc.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private httpService: HttpSvcService) { }
  sendStripeToken = (token, order) => {
    return this.httpService.post(`/stripe/charge`, 
    { stripeToken: token, order_id: order.order_id, description: order.description, amount: order.amount});
  }
}

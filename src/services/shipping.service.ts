import { Injectable } from '@angular/core';
import { HttpSvcService } from './http-svc.service';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(private httpService: HttpSvcService) { }

  getShippingRegions = () => {
    return this.httpService.get(`/shipping/regions`);
  }
  getShippingOptionsByRegion = (shipping_region_id) => {
    return this.httpService.get(`/shipping/regions/${shipping_region_id}`);
  }
}

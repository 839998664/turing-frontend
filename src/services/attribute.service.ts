import { Injectable } from '@angular/core';
import { HttpSvcService } from './http-svc.service';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(private httpService: HttpSvcService) { }

  getAttributes = () => {
    return this.httpService.get(`/attributes`);
  }
  getAttributeValues = (attributeId) => {
    return this.httpService.get(`/attributes/values/${attributeId}`);
  }
  getAttributesByProduct = (productId) => {
    return this.httpService.get(`/attributes/inProduct/${productId}`);
  }
}

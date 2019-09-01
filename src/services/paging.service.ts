import { Injectable } from '@angular/core';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class PagingService {
  pageSize = 8;
  page;
  data;
  constructor() { }
  setupPaging = (data, pageSize) => {
   
    this.pageSize = pageSize || this.pageSize;
    
    data.subscribe((response) => {
      this.data = response;
    });
    
  }
  getPagedData = (pageNo) => {
    return this.data.slice((pageNo - 1) * this.pageSize, pageNo * this.pageSize)
  }
  pageCount = () => {
    return Math.ceil(this.data.count / this.pageSize);
  }
}

import { Injectable } from '@angular/core';
import { HttpSvcService } from './http-svc.service';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpSVC: HttpSvcService) { }

  getProducts =  (pageNo: number, limit: number) => {
    return this.httpSVC.get(`/products?page=${pageNo}&limit=${limit}`);
  }
  getProductsByDepartment = (pageNo: number, limit: number, departmentId: number) => {
    return this.httpSVC.get(`/products/inDepartment/${departmentId}?page=${pageNo}&limit=${limit}`);
  }
  getProductsByCategory = (pageNo: number, limit: number, categoryId: number) => {
    return this.httpSVC.get(`/products/inCategory/${categoryId}?page=${pageNo}&limit=${limit}`);
  }
  getProductById = (productId: number) => {
    return this.httpSVC.get(`/products/${productId}`);
  }
  searchProducts = (searchText, pageNo) => {
    return this.httpSVC.get(`/products/search?query_string=${searchText}&page=${pageNo}&limit=${8}`)
  }
}

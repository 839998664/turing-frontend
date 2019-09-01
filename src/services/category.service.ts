import { Injectable } from '@angular/core';
import { HttpSvcService } from './http-svc.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpSVC: HttpSvcService) { }

  getCategories = () => {
    return this.httpSVC.get(`/categories`);
  }
  getCategoriesByDepartment = (departmentId: number) => {
    return this.httpSVC.get(`/categories/inDepartment/${departmentId}`);
  }
}

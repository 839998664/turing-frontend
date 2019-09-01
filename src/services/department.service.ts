import { Injectable } from '@angular/core';
import { HttpSvcService } from './http-svc.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpSVC: HttpSvcService) { }
  getDepartments = () => {
    return this.httpSVC.get(`/departments`);
  }
}

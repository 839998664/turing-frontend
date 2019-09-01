import { Injectable } from '@angular/core';
import { HttpSvcService } from './http-svc.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  accessToken = new Subject();
  authenticated;
  constructor(private httpSVC: HttpSvcService) { 
    
    this.accessToken.subscribe((response: any) => {
      if(response) {
        localStorage.setItem('access_token', response);
        this.authenticated = true;
      } else {
        localStorage.setItem('access_token', '');
        this.authenticated = false;
      }
    });
  }
  checkAuthenticationStatus = () => {
    let token = localStorage.getItem('access_token');
    if(token) {
      this.accessToken.next(token);
    }
  }
  logout = () => {
    this.accessToken.next('');    
  }
  login = (username, password) => {
    return this.httpSVC.post(`/customers/login`, { email: username, password: password})
  }
  register = (name, email, password) => {
    return this.httpSVC.post(`/customers`, { name, email, password});
  }
  isAuthenticated = () => {
    return this.authenticated;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpSvcService {
  BASE_URL = 'https://backendapi.turing.com';
  constructor(private http: HttpClient) { }

  get = (url: string) => {
    return this.http.get(this.BASE_URL + url);
  }
  post = (url: string, body) => {
    return this.http.post(this.BASE_URL + url, body);
  }
  put = (url: string, body) => {
    return this.http.put(this.BASE_URL + url, body);
  }
}

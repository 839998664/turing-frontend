import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
    accessToken;
    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.accessToken.subscribe((response: any) => {
            this.accessToken = response;
        })
    }
    intercept = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
        if (this.accessToken) {
            req = req.clone({
                setHeaders: { 
                    "USER-KEY": `${this.accessToken}`
                }
            });
        }
        return next.handle(req);
    }

    

}
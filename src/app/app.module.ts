import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryModule } from '../gallery/gallery.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { NavigationComponent } from '../layout/navigation/navigation.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigationService } from '../services/navigation.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './app.interceptor';
import { CustomerModule } from '../customer/customer.module';
import { PaymentModule } from '../payment/payment.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    GalleryModule,
    HttpClientModule,
    CustomerModule,
    PaymentModule
  ],
  providers: [NavigationService, {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

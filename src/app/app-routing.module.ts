import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../authentication/login/login.component';
import { GalleryComponent } from 'src/gallery/gallery/gallery.component';
import { ProductDetailComponent } from 'src/gallery/product-detail/product-detail.component';
import { CustomerProfileComponent } from 'src/customer/customer-profile/customer-profile.component';
import { CanActivateService } from 'src/services/can-activate.service';
import { PaymentComponent } from '../payment/payment/payment.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'product/details/:productId', component: ProductDetailComponent },
  { path: 'customer', component: CustomerProfileComponent, canActivate: [CanActivateService] },
  { path: 'checkout', component: PaymentComponent, canActivate: [CanActivateService] },
  { path: '', component: GalleryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

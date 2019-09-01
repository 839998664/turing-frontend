import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router';
import { CustomerService } from 'src/services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  cartCount = 0;
  customer = { name: "" };
  constructor(private cartService: CartService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private customerService: CustomerService) {
      this.authenticationService.accessToken.subscribe((response: any) => {
        if (!this.customer.name && response) {
          this.customerService.getCustomerProfile().subscribe((resp: any) => {
            this.customer = resp;
          })
        }
      });
      this.authenticationService.checkAuthenticationStatus();
  }
 
  ngOnInit() {

    this.cartService.cartId.subscribe((cart) => {
      let count = 0;
      this.cartService.getCart().subscribe((response: any) => {
        response.map(c => {
          count += c.quantity;
        });
        this.cartCount = count;
      });
    })
    this.cartService.cart.subscribe((cart) => {
      let count = 0;
      this.cartService.getCart().subscribe((response: any) => {
        response.map(c => {
          count += c.quantity;
        });
        this.cartCount = count;
      });
    });
  }
  login = (email, password) => {
    this.authenticationService.login(email, password).subscribe((response: any) => {
      this.customer = response.customer;
      this.authenticationService.accessToken.next(response.accessToken);
    });
  }
  register = (name, email, password) => {
    this.authenticationService.register(name, email, password).subscribe((response: any) => {
      this.customer = response.customer;
    })
  }
  navigateToProfile = () => {
    this.router.navigate(['/customer']);
  }
  isUserAuthenticated = () => {
    return this.authenticationService.isAuthenticated();
  }
  logout = () => {
    this.authenticationService.logout();
  }
}

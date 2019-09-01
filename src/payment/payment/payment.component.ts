import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { ShippingService } from 'src/services/shipping.service';
import { TokenService } from 'src/services/token.service';
import { OrderService } from 'src/services/order.service';
import { CustomerService } from 'src/services/customer.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  stripe;
  elements;
  card;
  selectedTab = 0;
  cart;
  addresses;
  shippings;
  shipping_id;
  cart_id;
  style = {
    base: {
      // Add your base input styles here. For example:
      fontSize: '16px',
      color: "#32325d",
      width: '100%'
    }
  };
  constructor(private cartService: CartService,
    private tokenService: TokenService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private shippingService: ShippingService) { }

  ngOnInit() {
    this.loadStripe();
    this.cart_id = this.cartService.getCartId();
    this.cartService.cartId.subscribe((response) => {
      this.cart_id = response;
    })
    this.cartService.getCart().subscribe((response) => {
      this.cart = response;

    }, null, () => {
      this.customerService.getCustomerProfile().subscribe((resp: any) => {
        this.shippingService.getShippingOptionsByRegion(resp.shipping_region_id).subscribe((response: any) => {
          this.shippings = response;
        });
      });
    });
  }
  loadStripe = () => {
    var script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/";
    script.addEventListener("load", this.stripeLoaded);
    document.body.append(script);
  }
  stripeLoaded = () => {
    this.stripe = (<any>window).Stripe("pk_test_NcwpaplBCuTL6I0THD44heRe");
    this.elements = this.stripe.elements();
    this.card = this.elements.create('card', { style: this.style });
    this.card.mount("#card-element");
    this.card.addEventListener('change', this.cardChange);
  }
  cardChange = (event) => {
    let displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  }
  makePayment = () => {
    this.stripe.createToken(this.card).then((result) => {
      if (result.error) {
        // Inform the user if there was an error.
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server.
        this.stripeTokenHandler(result.token);
      }
    });
  }
  stripeTokenHandler = (token) => {
    this.orderService.createOrder(this.cart_id, this.shipping_id, 1).subscribe((response: any) => {
      this.orderService.getOrder(response.orderId).subscribe((order: any) => {
        order.order_id = response.orderId;
        order.amount = +this.getGrandTotal() * 100;
        order.description = "Testing siddharth.seth1980@gmail.com";
        this.tokenService.sendStripeToken(token.id, order).subscribe((resp: any) => {
          console.log(resp);
        });
      });
    });
  }
  changeSelectedTab = (ndx) => {
    this.selectedTab = ndx;
  }
  getGrandTotal = () => {
    if (this.cart) {
      let gtotal = 0;
      this.cart.forEach(element => {
        gtotal += +element.subtotal;
      });
      return gtotal.toFixed(2);
    } else {
      return 0;
    }
  }
  saveShipping = (shipping_id) => {
    this.shipping_id = shipping_id;
  }
}

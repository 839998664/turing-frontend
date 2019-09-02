import { Injectable } from '@angular/core';
import { HttpSvcService } from './http-svc.service';
import { async } from 'q';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new Subject();
  cartId = new Subject();
  cart_id;
  constructor(private httpSVC: HttpSvcService) {
    if (!localStorage.getItem("cart_id")) {
      this.createCart().subscribe((cart: any) => {
        this.cartId.next(cart.cart_id);
        this.cart_id = cart.cart_id;
        localStorage.setItem("cart_id", cart.cart_id);
      });
    } else {      
      this.cartId.next(localStorage.getItem("cart_id"));
      this.cart_id = localStorage.getItem("cart_id");
      this.getCart().subscribe((response) => {
        this.cart.next(response);
      });
    }
  }
  getCartId = () => {
    return this.cart_id;
  }
  getCart = () => {
    return this.httpSVC.get(`/shoppingcart/${this.cart_id}`);
  }
  createCart = () => {
    return this.httpSVC.get(`/shoppingcart/generateUniqueId`);
  }
  addToCart = (productId, attributes = "LG, Blue") => {
    return this.httpSVC.post(`/shoppingcart/add`,
      { cart_id: this.cart_id, product_id: productId, attributes: attributes });
  }
  removeFromCart = (itemId) => {
    return this.httpSVC.delete(`/shoppingcart/removeproduct/${itemId}`);
  }
}

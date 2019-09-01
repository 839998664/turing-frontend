import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/services/navigation.service';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input("product") product;
  cartId;
  cart;
  BASE_IMG_URL = 'https://backendapi.turing.com/images/products/';
  constructor(private router: Router,
    private navigationService: NavigationService,
    private cartService: CartService) { }

  ngOnInit() {

  }
  gotoProductDetails = (productId) => {
    this.navigationService.changeSidebarVisibility(true);
    this.router.navigate([`/product/details/${productId}`]);
  }
  addToCart = (item) => {
    this.cartService.addToCart(item.product_id).subscribe((cart) => {
      this.cart = cart;
      this.cartService.cart.next(this.cart);
    })
  }
}

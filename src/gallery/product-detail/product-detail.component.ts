import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { NavigationService } from 'src/services/navigation.service';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, AfterContentInit{
  ngAfterContentInit(): void {
   
  }
  product = {};
  productId;
  cartId;
  cart;
  size;
  color;
  BASE_IMG_URL = 'https://backendapi.turing.com/images/products/';
  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private navigationService: NavigationService,
    private cartService: CartService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.productService.getProductById(params.productId).subscribe((response) => {
        this.product = response;
      });
    });
  }
  addToCart = (product) => {
    this.cartService.addToCart(product.product_id, this.color + ", " + this.size).subscribe((cart) => {
      this.cart = cart;
      this.cartService.cart.next(this.cart);
    })  
  }
  sizeSelected(size) {
    this.size = JSON.parse(size).attribute_value;
  }
  colorSelected = (color) => {
    this.color = JSON.parse(color).attribute_value;
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { NavigationService } from 'src/services/navigation.service';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  products;
  categories;
  allProducts;
  searchText = "";
  departmentSelected = -1;
  categorySelected = -1;
  pageCount = 0;
  currentPage = 1;
  constructor(private productService: ProductService,
    private navigationService: NavigationService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.navigationService.changeSidebarVisibility(false);
    this.categoryService.getCategories().subscribe((response: any) => {
      this.categories = response.rows;
    });

    this.productService.getProducts(1, 8).subscribe((response: any) => {
      this.products = response.rows;
      this.pageCount = Math.ceil(response.count / 8);
    });
    this.navigationService.departmentSelected.subscribe((departmentId: number) => {
      this.categorySelected = -1;
      this.departmentSelected = departmentId;
      this.searchText = "";
      this.productService.getProductsByDepartment(1, 8, departmentId).subscribe((response: any) => {
        this.products = response.rows;
        this.pageCount = Math.ceil(response.count / 8);
      });
    });
    this.navigationService.categorySelected.subscribe((categoryId: number) => {
      this.categorySelected = categoryId;
      this.departmentSelected = -1;
      this.searchText = "";
      this.productService.getProductsByCategory(1, 8, categoryId).subscribe((response: any) => {
        this.products = response.rows;
        this.pageCount = Math.ceil(response.count / 8);
      });
    });
    this.navigationService.searchText.subscribe((value) => {
      this.departmentSelected = -1;
      this.categorySelected = -1;
      this.searchText = value;
      this.productService.searchProducts(`*${value}*`, 1).subscribe((response: any) => {
        this.products = response.rows;
        this.pageCount = Math.ceil(response.count / 8);
      });
    });
  }
  pages = () => {
    return new Array(this.pageCount);
  }
  switchToPage = (pageNo) => {
    this.currentPage = pageNo;
    if (this.searchText) {      
      this.productService.searchProducts(`*${this.searchText}*`, this.currentPage).subscribe((response: any) => {
        this.products = response.rows;
      });
    } else if(this.categorySelected > -1) {
      this.productService.getProductsByCategory(this.currentPage, 8, this.categorySelected).subscribe((response: any) => {
        this.products = response.rows;
        this.pageCount = Math.ceil(response.count / 8);
      });
    } else if(this.departmentSelected > -1) {
      this.productService.getProductsByDepartment(this.currentPage, 8, this.departmentSelected).subscribe((response: any) => {
        this.products = response.rows;
        this.pageCount = Math.ceil(response.count / 8);
      });
    } else {
      this.productService.getProducts(this.currentPage, 8).subscribe((response: any) => {
        this.products = response.rows;
        this.pageCount = Math.ceil(response.count / 8);
      });
    }
  }
  previousPage = () => {
    this.currentPage = (this.currentPage - 1) >= 1 ? this.currentPage - 1 : 1;
    this.switchToPage(this.currentPage);
  }
  nextPage = () => {
    this.currentPage = (this.currentPage + 1) <= this.pageCount ? this.currentPage + 1 : this.pageCount;
    this.switchToPage(this.currentPage);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { SizePickerComponent } from './size-picker/size-picker.component';



@NgModule({
  declarations: [ProductComponent, GalleryComponent, ProductDetailComponent, ColorPickerComponent, SizePickerComponent],
  imports: [
    CommonModule
  ]
})
export class GalleryModule { }

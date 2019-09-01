import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttributeService } from 'src/services/attribute.service';

@Component({
  selector: 'app-size-picker',
  templateUrl: './size-picker.component.html',
  styleUrls: ['./size-picker.component.scss']
})
export class SizePickerComponent implements OnInit {
  sizes = [];
  selected = -1;
  productId;
  @Output("sizeSelected") sizeChosen = new EventEmitter();
  constructor(private activatedRoute: ActivatedRoute,
    private attributeService: AttributeService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.productId = params.productId;
      this.attributeService.getAttributesByProduct(this.productId).subscribe((response: any) => {
        this.sizes = response.filter(s => s.attribute_name.toLowerCase() === "size");
      });
    });
  }
  sizeSelected = (index) => {
    this.selected = index;
    this.sizeChosen.emit(JSON.stringify(this.sizes[this.selected]));

  }
}

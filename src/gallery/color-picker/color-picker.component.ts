import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AttributeService } from 'src/services/attribute.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  selected = -1;
  colors = [];
  @Output("colorSelected") colorChosen = new EventEmitter();
  productId;
  constructor(private attributeService: AttributeService,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.productId = params.productId;
      this.attributeService.getAttributesByProduct(this.productId).subscribe((response: any) => {
        this.colors = response.filter(c => c.attribute_name.toLowerCase() === "color");
      });
    });
    
  }
  colorSelected = (index) => {
    this.selected = index;
    this.colorChosen.emit(JSON.stringify(this.colors[index]));
  }
}

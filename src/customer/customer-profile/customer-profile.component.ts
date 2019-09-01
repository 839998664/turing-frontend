import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/services/customer.service';
import { NavigationService } from 'src/services/navigation.service';
import { ShippingService } from 'src/services/shipping.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
  customer;
  regions;
  constructor(private customerService: CustomerService,
    private navigationService: NavigationService,
    private shippingService: ShippingService) { }

  ngOnInit() {
    this.navigationService.changeSidebarVisibility(true);
    this.customerService.getCustomerProfile().subscribe((response: any) => {
      this.customer = response;
      this.shippingService.getShippingRegions().subscribe((resp: any) => {
        this.regions = resp;
      });
    });
    
  }
  saveChanges = (address_1, address_2, city, region, postalcode, country, shipping_region) => {
    this.customerService.updateCustomerProfile({
      address_1: address_1,
      address_2: address_2,
      city: city,
      region: region,
      postal_code: postalcode,
      country: country,
      shipping_region_id: shipping_region
    }).subscribe((response) => {
      console.log(response);
    });
  }

}

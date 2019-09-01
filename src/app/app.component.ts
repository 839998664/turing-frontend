import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'turing-app';
  show: boolean = true;
  constructor(private navigationService: NavigationService) {

  }
  ngOnInit() {
    this.navigationService.showSidebar.subscribe((show) => {
      this.show = show;      
    });
  }
  showSidebar = () => {
    return this.show;
  }
}

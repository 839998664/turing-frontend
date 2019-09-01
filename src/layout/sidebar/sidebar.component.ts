import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/services/category.service';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  categories = [];
  show: boolean = true;
  selectedCategory;
  constructor(private categoryService: CategoryService,
    private navigationService: NavigationService) { }

  ngOnInit() {
    this.navigationService.showSidebar.subscribe((show: boolean) => {
      this.show = show;
    })
    this.navigationService.departmentSelected.subscribe((departmentId: number) => {
      this.selectedCategory = -1;
      this.categoryService.getCategoriesByDepartment(departmentId).subscribe((response: any) => {
        this.categories = response;
      })
    });
  }
  categorySelected = (categoryId) => {
    this.selectedCategory = categoryId;
    this.navigationService.changeCategory(categoryId);
  }

}

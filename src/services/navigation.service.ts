import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  departmentSelected: Subject<number> = new Subject();
  categorySelected: Subject<number> = new Subject();
  searchText = new Subject<string>();
  showSidebar = new Subject<boolean>();
  constructor() { }
  changeDepartment = (departmentId: number) => {
    this.departmentSelected.next(departmentId);
  }
  changeCategory = (categoryId: number) => {
    this.categorySelected.next(categoryId);
  }
  changeSearchText = (text) => {
    this.searchText.next(text);
  }
  changeSidebarVisibility = (hide) => {
    this.showSidebar.next(hide);
  }
}

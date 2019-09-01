import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentService } from 'src/services/department.service';
import { NavigationService } from 'src/services/navigation.service';
import { Subject, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, mergeMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  departments;
  subscription;
  selectedDepartment;
  keyUp = new Subject<KeyboardEvent>();
  @ViewChild("searchText", { static: true }) searchText;
  constructor(private departmentService: DepartmentService,
    private navigationService: NavigationService) { }

  ngOnInit() {
    this.departmentService.getDepartments().subscribe((response) => {
      this.departments = response;
    });
    this.subscription = this.keyUp.pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      distinctUntilChanged(),
      mergeMap(search => of(search).pipe(
        delay(500),
      )),
    ).subscribe((value) => {
      this.navigationService.changeSearchText(value);
    });
    this.navigationService.categorySelected.subscribe((response) => {
      this.selectedDepartment = -1;
      this.resetSearchText();
    })
  }
  departmentSelected = (departmentId) => {
    this.selectedDepartment = departmentId;
    this.navigationService.changeDepartment(departmentId);
    this.resetSearchText();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  resetSearchText = () => {
    this.searchText.nativeElement.value = "";
  }
}

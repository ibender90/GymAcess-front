import { Component, ElementRef, OnInit, ViewChild, inject, numberAttribute } from '@angular/core';
import { SearchUsersService } from '../search-users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserWithPaidPeriodDto } from '../model/UserWithPaidPeriodDto';
import { ManagerService } from '../manager.service';
import { NgbdDatepickerRangeComponent } from '../ngbd-datepicker-range/ngbd-datepicker-range.component';
import { UserService } from '../user.service';
import { RoleService } from '../role.service';
import { AdminService } from '../admin.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-usrs-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbdDatepickerRangeComponent, NavbarComponent],
  templateUrl: './usrs-list.component.html',
  styleUrl: './usrs-list.component.scss'
})
export class UsrsListComponent implements OnInit {

  @ViewChild('myModal') model: ElementRef | undefined;
  userObj: UserWithPaidPeriodDto = {} as UserWithPaidPeriodDto;
  users: UserWithPaidPeriodDto[] = [];
  currentPage = 0;
  totalPages = 0;
  limit = 2;
  lastName: string = '';
  showDatePicker = true;

  private searchUsersService = inject(SearchUsersService);
  private managerService = inject(ManagerService);
  private roleService = inject(RoleService);
  private adminService = inject(AdminService);

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(){
    this.searchUsersService.getUsersWithPaidPeriod(this.currentPage, this.limit, this.lastName)
    .subscribe(response =>{
      this.users = response.data;
      this.totalPages = response.totalPages;}
    )
  }

  serachByLastName(){
    this.currentPage = 0;
    this.fetchUsers();
  }

  previousPage(){
    if(this.currentPage > 0){
      this.currentPage--;
      this.fetchUsers();
    }
  }

  nextPage(){
    if(this.currentPage < this.totalPages){
      this.currentPage++;
      this.fetchUsers();
    }
  }

  onSelect(id: number): void{  //todo replace
   this.managerService.getUserById(id).subscribe(res => {
    alert(JSON.stringify(res))
   }
   )
  }

  onEdit(item: UserWithPaidPeriodDto) {
    this.userObj =  item;
    this.openModel();
  }

  openModel() {
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }

  closeModel() {
    this.userObj = {} as UserWithPaidPeriodDto;
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  noPaidPeriod(){
    return this.userObj.paidPeriod == undefined;
  }

  toggleShowDatePicker(){
    this.showDatePicker = !this.showDatePicker;
  }

  isAdmin(){
    return this.roleService.isAdmin();
  }

  setManager(id: number){
    this.adminService.assignManager(id).subscribe(
      res => {
        alert(JSON.stringify(res.roles));
      }
    )
  }

  updateUser(user: UserWithPaidPeriodDto){
    this.managerService.updateUser(user).subscribe(
      res=> {
        alert(user.firstName + ' is saved');
        this.closeModel();
    }
    )
  }

  isManager(){
    return this.roleService.isManager();
  }
}

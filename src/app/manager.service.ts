import { HttpClient } from '@angular/common/http';
import { Injectable, Input, OnInit, inject, input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserWithPaidPeriodDto } from './model/UserWithPaidPeriodDto';

@Injectable({
  providedIn: 'root'
})
export class ManagerService{

  private http = inject(HttpClient);
  private url = 'http://localhost:8080/api/v1/manager/';
  private userToManage ?: UserWithPaidPeriodDto;

  constructor() { }

  getUserById(id: number): Observable<UserWithPaidPeriodDto>{
    return this.http.get<UserWithPaidPeriodDto>(this.url + id);
  }

  updatePayment(user: UserWithPaidPeriodDto): Observable<UserWithPaidPeriodDto>{
    return this.http.put<UserWithPaidPeriodDto>(this.url + 'update_payment', user);
  }

  updateUser(user: UserWithPaidPeriodDto): Observable<UserWithPaidPeriodDto>{
    return this.http.put<UserWithPaidPeriodDto>(this.url + 'update_user', user);
  }
}

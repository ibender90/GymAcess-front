import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserFullDto } from './model/UserFullDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/api/v1/user/';
  private http = inject(HttpClient);

  constructor() { }

  getUserByToken(): Observable<UserFullDto> {
    return this.http.get<UserFullDto>(this.url);
  }

  public getUsersRoles(){
    let roles: string[] = new Array();
    this.getUserByToken().subscribe((user)=>{
      if(user){
        user.roles.forEach(role => {
          roles.push(role.roleName)
        });
      }
    })
    return roles;
  }
  
}

import { Injectable, inject } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  

  private userService = inject(UserService);
  roles: string[];

  constructor() {
    this.roles = this.userService.getUsersRoles();
   }

  isUser(): boolean{
    return this.roles?.includes('USER');
  }
  isAdmin(): boolean{
    return this.roles?.includes('ADMIN');
  }
  isAdminOrManajer(): boolean{
    return(this.roles?.includes('ADMIN') || this.roles?.includes('MANAGER'));
  }
  isManager() {
    return this.roles?.includes('MANAGER');
  }
}

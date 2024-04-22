import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  authService = inject(AuthService);
  roleService = inject(RoleService);

  constructor(){
  }

  isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }

  isUser(): boolean{
    return this.roleService.isUser();
  }

  isAdminOrManajer(): boolean{
    return this.roleService.isAdminOrManajer();
  }
  
  logout(){
    this.authService.logout();
  }

  
}

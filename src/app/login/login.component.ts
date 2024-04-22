import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  authService = inject(AuthService);
  router = inject(Router);

  login(event: Event){
    event.preventDefault(); //no redirect
    this.authService.login({
      email: this.email,
      password: this.password
    }
    ).subscribe(()=>{
      this.router.navigate(['/']);
    })
  }
}

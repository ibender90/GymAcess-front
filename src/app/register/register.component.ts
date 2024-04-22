import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  firstname = '';
  lastname = '';
  email = '';
  password = '';
  authService = inject(AuthService);
  router = inject(Router);

  register(event: Event){
    event.preventDefault(); //no redirect
    this.authService.register({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    }
    ).subscribe(()=>{
      this.router.navigate(['/']);
    })
  }
}

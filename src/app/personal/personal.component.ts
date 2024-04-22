import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { UserFullDto } from '../model/UserFullDto';
import { UserService } from '../user.service';
import { QrGeneratorComponent } from '../qr-generator/qr-generator.component';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule, NavbarComponent, QrGeneratorComponent],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent {
  userService = inject(UserService);
  user?: UserFullDto;

  constructor(){
    this.userService.getUserByToken().subscribe((r)=>{
      this.user = r;
    }
    )
  }

  hasPaidPeriod(){
    if(this.user){
      if(this.user.paidPeriod){
        return true;
      }
    }
    return false;
  }
}

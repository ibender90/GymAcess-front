import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PersonalComponent } from './personal/personal.component';
import { UsrsListComponent } from './usrs-list/usrs-list.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';

export const routes: Routes = [

    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'user', component: PersonalComponent, canActivate:[authGuard]},
    {path: 'search', component: UsrsListComponent, canActivate:[authGuard]},
    {path: 'scan', component: QrScannerComponent, canActivate:[authGuard]}
];

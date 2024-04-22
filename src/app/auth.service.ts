import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private http = inject(HttpClient);
  private userService = inject(UserService);
  private router = inject(Router);

  constructor(
  ) { }

  login(user:{
    email: string, password: string
  }) : Observable<any>{
    return this.http
    .post('http://localhost:8080/api/v1/auth/authenticate', user)
    .pipe(tap((tokens:any) => this.doLoginUser(user.email, JSON.stringify(tokens)))
    )
  }

  register(regisetRequest:{
    firstname: string, lastname: string, email: string, password: string})
    : Observable<any>{
      return this.http
      .post('http://localhost:8080/api/v1/auth/register', regisetRequest)
      .pipe(tap((tokens:any) => this.doLoginUser(regisetRequest.email, JSON.stringify(tokens)))
      )
  }

  private doLoginUser(email: string, tokens: any){
    //this.loggedUser = email;
    this.storeJWT(tokens);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJWT(jwt: string){
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout(){
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }


  isLoggedIn(){
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

  isTokenExpired(){
    const tokens = localStorage.getItem(this.JWT_TOKEN);
    if(!tokens){
      return true;
    }
    const access_token = JSON.parse(tokens).access_token;
    const decoded = jwtDecode(access_token);
    if(!decoded.exp) {
      return true;
    }
    const expirationDate = decoded.exp * 1000;
    const now = new Date().getTime();

    return expirationDate < now;
  }

  refreshToken(){
    let tokens: any = localStorage.getItem(this.JWT_TOKEN);
    if(!tokens){
      return;
    }
    tokens = JSON.parse(tokens);
    let refresh_token = tokens.refresh_token;
    return this.http.post<any>('http://localhost:8080/api/v1/auth/refresh-token', refresh_token)
    .pipe(tap((tokens:any) => this.storeJWT(JSON.stringify(tokens))));
  }


}

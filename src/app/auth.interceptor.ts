import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  var jwtToken = getJwtToken();
  const authService = inject(AuthService);

  if(jwtToken){
    var cloned = req.clone({
      setHeaders:{
        Authorization: `Bearer ${jwtToken}`
      }
    });
    return next(cloned).pipe(
      catchError((error: HttpErrorResponse)=>{
        if(error.status === 401){
          const isRefrsh = confirm("Sessison is about to expire, continue?")
          if(isRefrsh){
            authService.refreshToken()?.subscribe(()=>{});
            jwtToken = getJwtToken();
            cloned.headers.set(
              "Authorization", `Bearer ${jwtToken}`
            )
          } else
          {
            authService.logout();
          }
        }
        return next(req);
      }
      )
    );
  }
  return next(req);
};

function getJwtToken(): string | null{
 let tokens:any =  localStorage.getItem('JWT_TOKEN');
 if(!tokens){
  return null;
 }
 const access_token = JSON.parse(tokens).access_token;
 return access_token;
}
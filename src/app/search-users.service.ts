import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchUsersService {
  private url = 'http://localhost:8080/api/v1/manager/search';
  http = inject(HttpClient);
  constructor() { }


  getUsersWithPaidPeriod(page: number, limit: number, lastName: string): Observable<any>{ //todo type
    const params = {page: 
        page.toString(),
        limit: limit.toString(), 
        lastName: lastName.toString()};
      return this.http.get(this.url, {params});
    }
  
}

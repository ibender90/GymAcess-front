import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserFullDto } from './model/UserFullDto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8080/api/v1/admin/';
  constructor() { }

  assignManager(id: number):Observable<UserFullDto>{
    return this.http.get<UserFullDto>(this.url +'set_manager/'+ id);
  }
}

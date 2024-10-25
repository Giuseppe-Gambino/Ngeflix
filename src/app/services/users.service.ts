import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { iUser } from '../interfaces/i-user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  registerUrl: string = environment.registerUrl;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<iUser[]>(this.registerUrl);
  }
}

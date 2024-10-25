import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { iMovie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  moviesUrl: string = environment.moviesUrl;

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<iMovie[]>(this.moviesUrl);
  }
}

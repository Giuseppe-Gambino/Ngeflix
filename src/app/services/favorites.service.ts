import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { iMovie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favoritesUrl: string = environment.favoritesUrl;

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<iMovie[]>(this.favoritesUrl);
  }

  addFavorites(newMovie: iMovie) {
    return this.http.post<iMovie[]>(this.favoritesUrl, newMovie);
  }

  removeFavorite(id: number) {
    return this.http.delete<iMovie>(`${this.favoritesUrl}/${id}`);
  }
}

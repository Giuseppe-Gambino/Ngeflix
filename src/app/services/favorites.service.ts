import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { iFavorites } from '../interfaces/favorites';
import { Observable } from 'rxjs';
import { iMovie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favoritesUrl: string = environment.favoritesUrl;
  moviesUrl: string = environment.moviesUrl;

  constructor(private http: HttpClient) {}

  // ss

  getUserFavorites(userId: number) {
    return this.http.get<iFavorites[]>(`${this.favoritesUrl}?userId=${userId}`);
  }

  // Funzione per ottenere i dettagli dei film a partire da una lista di `movieId`
  getMoviesByIds(movieIds: number[]) {
    const queryParams = movieIds.map((id) => `id=${id}`).join('&');
    return this.http.get<iMovie[]>(`${this.moviesUrl}?${queryParams}`);
  }

  addFavorite(userId: number, movieId: number) {
    return this.http.post(`${this.favoritesUrl}`, {
      userId,
      movieId,
    });
  }

  removeFavorite(favoriteId: number) {
    return this.http.delete(`${this.favoritesUrl}/${favoriteId}`);
  }
}

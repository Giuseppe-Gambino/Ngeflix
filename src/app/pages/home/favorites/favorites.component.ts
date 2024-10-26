import { map, pipe, tap } from 'rxjs';
import { Component } from '@angular/core';
import { iMovie } from '../../../interfaces/movie';
import { iUser } from '../../../interfaces/i-user';
import { AuthService } from '../../../auth/auth.service';
import { FavoritesService } from '../../../services/favorites.service';
import { MoviesService } from '../../../services/movies.service';
import { iFavorites } from '../../../interfaces/favorites';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  user!: iUser;

  favoriteMovies!: iMovie[];

  constructor(private authSvc: AuthService, private FavSvc: FavoritesService) {}

  ngOnInit() {
    this.authSvc.user$.subscribe((userD) => {
      if (!userD) return;
      this.user = userD;
    });

    this.loadFavorites(this.user.id);
  }

  loadFavorites(userId: number) {
    this.FavSvc.getUserFavorites(userId).subscribe((favorites) => {
      const movieIds = favorites.map((fav) => fav.movieId);

      if (movieIds.length === 0) {
        this.favoriteMovies = [];
        return;
      }

      this.FavSvc.getMoviesByIds(movieIds).subscribe((movies) => {
        this.favoriteMovies = movies;
      });
    });
  }

  favoriteItemId!: number;
  removeFav(id: number) {
    this.FavSvc.getUserFavorites(this.user.id)
      .pipe(map((res) => res.find((item) => item.movieId === id)))
      .subscribe((favorite) => {
        if (favorite) {
          this.favoriteItemId = favorite.id;
          console.log('Favorite ID:', this.favoriteItemId);

          this.FavSvc.removeFavorite(this.favoriteItemId).subscribe(() => {
            console.log(`Favorite ${this.favoriteItemId} rimosso`);
          });
        } else {
          console.log('Favorite non trovato:', id);
        }
      });

    this.favoriteMovies = this.favoriteMovies.filter(
      (movie) => movie.id !== id
    );
  }
}

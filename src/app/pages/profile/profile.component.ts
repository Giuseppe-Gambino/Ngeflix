import { Component, OnInit } from '@angular/core';
import { iMovie } from '../../interfaces/movie';
import { FavoritesService } from '../../services/favorites.service';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../interfaces/i-user';
import { MoviesService } from '../../services/movies.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user!: iUser;

  moviesFavorites!: iMovie[];

  constructor(private FavSvc: FavoritesService, private authSvc: AuthService) {}

  ngOnInit(): void {
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
        this.moviesFavorites = [];
        return;
      }

      this.FavSvc.getMoviesByIds(movieIds).subscribe((movies) => {
        this.moviesFavorites = movies;
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

    this.moviesFavorites = this.moviesFavorites.filter(
      (movie) => movie.id !== id
    );
  }
}

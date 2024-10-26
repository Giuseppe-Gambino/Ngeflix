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
      this.FavSvc.getMoviesByIds(movieIds).subscribe((movies) => {
        this.favoriteMovies = movies;
      });
    });
  }

  ciao!: iFavorites[];
  removeFav(id: number) {
    this.FavSvc.getUserFavorites(this.user.id).subscribe((data) => {
      this.ciao = data;
      console.log(this.ciao);
    });

    // devo cercare di prendere il film correto, data mi da i film fav di un utente, e tramite id del film devo trovare l'id del fav ed eliminarlo

    // this.ciao = this.ciao.filter((item) => item.movieId == id);
    // console.log(this.ciao.filter((item) => item.movieId == id));

    console.log(this.ciao);

    // this.FavSvc.removeFavorite(id).subscribe();

    this.favoriteMovies = this.favoriteMovies.filter(
      (movie) => movie.id !== id
    );
  }
}

// .filter((item) => item.movieId == id && item.userId == this.user.id)

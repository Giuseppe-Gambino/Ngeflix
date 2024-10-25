import { Component } from '@angular/core';
import { iMovie } from '../../../interfaces/movie';
import { iUser } from '../../../interfaces/i-user';
import { AuthService } from '../../../auth/auth.service';
import { FavoritesService } from '../../../services/favorites.service';
import { MoviesService } from '../../../services/movies.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  user!: iUser;

  moviesFavorites!: iMovie[];

  constructor(private authSvc: AuthService, private FavSvc: FavoritesService) {}

  ngOnInit(): void {
    this.FavSvc.getMovies().subscribe((data) => (this.moviesFavorites = data));

    this.authSvc.user$.subscribe((userD) => {
      if (!userD) return;
      this.user = userD;
    });
  }

  ngOnDestroy(): void {
    this.FavSvc.getMovies()
      .subscribe((data) => (this.moviesFavorites = data))
      .unsubscribe();
  }

  removeFav(id: number) {
    this.FavSvc.removeFavorite(id).subscribe();
    this.moviesFavorites = this.moviesFavorites.filter(
      (item) => item.id !== id
    );
  }
}

import { iMovie } from './../../interfaces/movie';
import { CommonModule } from '@angular/common';
import { iUser } from './../../interfaces/i-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { MoviesService } from '../../services/movies.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  user!: iUser;

  movies!: iMovie[];

  constructor(
    private authSvc: AuthService,
    private MovSvc: MoviesService,
    private FavSvc: FavoritesService
  ) {}

  ngOnInit(): void {
    this.MovSvc.getMovies().subscribe((data) => (this.movies = data));

    this.authSvc.user$.subscribe((userD) => {
      if (!userD) return;
      this.user = userD;
    });
  }

  ngOnDestroy(): void {
    this.MovSvc.getMovies()
      .subscribe((data) => (this.movies = data))
      .unsubscribe();
  }

  addFav(newMovie: iMovie) {
    this.FavSvc.addFavorites(newMovie).subscribe();
  }
}

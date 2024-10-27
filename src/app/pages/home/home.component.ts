import { iMovie } from './../../interfaces/movie';

import { iUser } from './../../interfaces/i-user';
import { Component, OnDestroy, OnInit, viewChild } from '@angular/core';
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
  allMovies!: iMovie[];

  showFilter: boolean = false;

  movieGenres: string[] = [
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'Historical',
    'Horror',
    'Musical',
    'Mystery',
    'Romance',
    'Science Fiction',
    'Sports',
    'Thriller',
    'War',
    'Western',
  ];

  constructor(
    private authSvc: AuthService,
    private MovSvc: MoviesService,
    private FavSvc: FavoritesService
  ) {}

  ngOnInit(): void {
    this.MovSvc.getMovies().subscribe(
      (data) => ((this.movies = data), (this.allMovies = data))
    );

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

  addFav(movieId: number) {
    this.FavSvc.addFavorite(this.user.id, movieId).subscribe();
  }

  selectedGenre!: string;
  filterTag(tag: string) {
    this.movies = this.allMovies;
    this.movies = this.movies.filter((item) => item.genre == tag);
    this.selectedGenre = tag;
  }

  searchBar(searchInput: string) {
    this.movies = this.allMovies;
    this.movies = this.movies.filter((item) =>
      item.title.toLowerCase().includes(searchInput)
    );
  }

  movieLength() {
    return this.movies && !this.movies.length;
  }

  seeAllMovies() {
    this.movies = this.allMovies;
  }
}

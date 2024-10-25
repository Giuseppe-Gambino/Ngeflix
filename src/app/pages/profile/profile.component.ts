import { Component, OnInit } from '@angular/core';
import { iMovie } from '../../interfaces/movie';
import { FavoritesService } from '../../services/favorites.service';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../interfaces/i-user';

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
    this.FavSvc.getMovies().subscribe((data) => (this.moviesFavorites = data));

    this.authSvc.user$.subscribe((userD) => {
      if (!userD) return;
      this.user = userD;
    });
  }

  removeFav(id: number) {
    this.FavSvc.removeFavorite(id).subscribe();
    this.moviesFavorites = this.moviesFavorites.filter(
      (item) => item.id !== id
    );
  }
}

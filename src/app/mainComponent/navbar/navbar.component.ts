import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(private authSvc: AuthService, private router: Router) {}

  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.authSvc.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = res;
    });
  }

  showBol: boolean = false;

  show() {
    this.showBol = !this.showBol;
  }

  esci() {
    this.authSvc.logout();
    this.router.navigate(['']);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { iUser } from '../../interfaces/i-user';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, OnDestroy {
  user!: iUser;

  users!: iUser[];

  constructor(private authSvc: AuthService, private UserSvc: UsersService) {}

  ngOnInit(): void {
    this.UserSvc.getUsers().subscribe((data) => (this.users = data));

    this.authSvc.user$.subscribe((userD) => {
      if (!userD) return;
      this.user = userD;
    });
  }

  ngOnDestroy(): void {
    this.UserSvc.getUsers()
      .subscribe((data) => (this.users = data))
      .unsubscribe();
  }
}

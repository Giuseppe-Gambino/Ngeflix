import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      // email pass
      email: this.fb.control(''),
      password: this.fb.control('', [Validators.required]),
    });
  }

  onSubmit() {
    console.log('Login data:', this.form.value);
    console.log('Login data:', this.form);

    this.authSvc
      .login(this.form.value)
      .subscribe((data) => this.router.navigate(['home']));
  }
}

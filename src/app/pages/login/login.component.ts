import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of, pipe } from 'rxjs';

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

  canEnter: boolean = false;
  loggato() {
    this.canEnter = !this.canEnter;
  }

  CannotEnter: boolean = false;
  typeError!: string;

  onSubmit() {
    console.log('Login data:', this.form.value);
    console.log('Login data:', this.form);

    this.authSvc
      .login(this.form.value)
      .pipe(
        catchError((error) => {
          // Gestione dell'errore qui
          console.error('Errore intercettato:', error.error);
          this.typeError = error.error;
          // Restituisce un nuovo observable o lancia un errore
          this.CannotEnter = !this.CannotEnter;
          setTimeout(() => {
            this.CannotEnter = !this.CannotEnter;
          }, 1500);
          return 'valore di fallback';
        })
      )
      .subscribe((data) => {
        this.loggato();
        setTimeout(() => {
          this.router.navigate(['home']);
        }, 1500);
      });
  }
}

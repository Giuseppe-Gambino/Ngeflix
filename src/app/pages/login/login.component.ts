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
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  canEnter: boolean = false;
  loggato() {
    this.canEnter = !this.canEnter;
  }

  minlength(input: string) {
    return this.form.get(input)?.errors?.['minlength'];
  }

  isValid(input: string) {
    return this.form.get(input)?.invalid && this.form.get(input)?.touched;
  }

  CannotEnter: boolean = false;
  typeError!: string;

  onSubmit() {
    this.authSvc
      .login(this.form.value)
      .pipe(
        catchError((error) => {
          this.typeError = error.error;

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

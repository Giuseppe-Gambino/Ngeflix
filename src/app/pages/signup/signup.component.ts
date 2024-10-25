import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control(''),
      // email pass
      email: this.fb.control(''),
      password: this.fb.control('', [Validators.required]),
      favorites: this.fb.control([]),
    });
  }

  onSubmit() {
    console.log(this.form);
  }

  register() {
    this.authSvc.register(this.form.value).subscribe((res) => {
      this.router.navigate(['']);
    });
  }
}

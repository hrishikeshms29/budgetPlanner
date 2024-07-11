import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  activeForm: 'login' | 'register' = 'login';

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.dummyEmailValidator]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.dummyEmailValidator]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/)]]
    });
  }

  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
  }

  login() {
    if (this.loginForm.valid) {
      console.log("Login info==>", this.loginForm.value);
      this.router.navigate(['/budget-planner/dashboard']);
    } else {
      this.snackBar.open('Invalid email or password!', 'Close', { duration: 3000 });
    }
  }

  register() {
    if (this.registerForm.valid) {
      console.log("Register info==>>", this.registerForm.value);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      this.router.navigate(['/budget-planner/login']);
    } else {
      this.snackBar.open('Please fill in all fields correctly!', 'Close', { duration: 3000 });
    }
  }

  dummyEmailValidator(control: FormControl) {
    const dummyEmails = ['test@test.com', 'example@example.com'];
    return dummyEmails.includes(control.value) ? { dummyEmail: true } : null;
  }
}

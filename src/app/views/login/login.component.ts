import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {
  }
  error : string | null = null;
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email, Validators.pattern(/\S/)]],
    password: ['', [Validators.required, Validators.pattern(/\S/)]]
  });

  login() {
    this.authService.login({
      username: this.loginForm.value.username ||"",
      password: this.loginForm.value.password ||"",
    }).subscribe({
      next: response => {
          console.log("login response:", response)
          this.authService.setAuthUser(response);
          this.router.navigate(['/'])
      },
      error: () => {
        this.error = "Invalid credentials"
      }
    });
  }
}

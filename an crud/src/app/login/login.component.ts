import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  hidePassword = true;
  show: boolean = false;
  clicked() {
    this.show = !this.show;
  }
  protected aFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rememberMe: [false], // Optionnel, selon si vous voulez implémenter cette fonctionnalité
    });
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required],
    });
  }
  siteKey: string = '6LevP4spAAAAAGORJ4Z3vjGfitgthh0dJjsHyOWE';

  handleLogin() {
    if (this.loginFormGroup.invalid) {
      this.snackbar.open('Please fill all fields correctly.', 'close', {
        duration: 5000,
      });
      return;
    }

    this.authService.login(this.loginFormGroup.value).subscribe(
      (response) => {
        this.snackbar.open('Login successful.', 'close', { duration: 5000 });
        // Assuming the response includes user details with roles
        const userRoles = response.roles || [];
        if (userRoles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/dashboard/' + response.id]);
        } else if (userRoles.includes('ROLE_MEMBRE')) {
          this.router.navigate(['/course']);
        } else {
          // Default redirection or show an error message
          this.snackbar.open('Unauthorized Access', 'close', {
            duration: 5000,
          });
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.snackbar.open(
          'Failed to log in. Please check your credentials.',
          'close',
          { duration: 5000 }
        );
      }
    );
  }
  signInWithGoogle() {
    this.authService.googleSignIn();
  }
  signInWithgithub() {
    this.authService.githubSignIn();
  }
  signInWithfacebook() {
    this.authService.facebookSignIn();
  }
}

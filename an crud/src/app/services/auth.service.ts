import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs'; // Ajoutez 'of' ici
import { map, catchError } from 'rxjs/operators'; // Importez 'map' et 'catchError'
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Adjust import to use compat module

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8081/api/api';
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router,
    private fireauth: AngularFireAuth
  ) {}

  register(signupRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, signupRequest);
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signin`, loginRequest).pipe(
      map((response: any) => {
        if (response && response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
          console.log(
            'Token retrieved and stored successfully:',
            response.accessToken
          );
        } else {
          console.log('No token found in the response:', response);
        }
        return response;
      }),
      catchError((error) => {
        console.error('Error during login:', error);
        return throwError(error);
      })
    );
  }
  confirmAccount(token: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/confirm-account?token=${token}`);
  }

  logout() {
    console.log('Début de la déconnexion');
    if (localStorage.getItem('accessToken')) {
      localStorage.removeItem('accessToken');
      console.log("Jeton d'authentification supprimé avec succès");
    }
    this.router.navigate(['/login']);
    console.log('Redirection vers la page de connexion après déconnexion');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    console.log('isAuthenticated suceess');

    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  isUserLoggedIn(): boolean {
    return this.isAuthenticated();
  }
  getUserProfile(): Observable<any> {
    // Ajoutez le token JWT au header Authorization
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      }),
    };

    // URL correcte de l'API pour récupérer le profil
    const apiUrl = 'http://localhost:8081/api/api/auth/profile'; // Assurez-vous que c'est la bonne URL

    return this.http.get<any>(apiUrl, httpOptions);
  }

  //sign in with google
  // googleSignIn() {
  //   return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(
  //     (res) => {
  //       this.router.navigate(['/dashboard']);
  //       localStorage.setItem('token', JSON.stringify(res.user?.uid));
  //     },
  //     (err) => {
  //       alert(err.message);
  //     }
  //   );
  // }
  // Ajoutez d'autres méthodes au besoin
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(
      (res) => {
        this.router.navigate(['/dash']);
        localStorage.setItem('accessToken', JSON.stringify(res.user?.uid));
      },
      (err) => {
        alert(err.message);
      }
    );
  }
  githubSignIn() {
    return this.fireauth.signInWithPopup(new GithubAuthProvider()).then(
      (res) => {
        this.router.navigate(['/dash']);
        localStorage.setItem('accessToken', JSON.stringify(res.user?.uid));
      },
      (err) => {
        alert(err.message);
      }
    );
  }
  facebookSignIn() {
    return this.fireauth.signInWithPopup(new FacebookAuthProvider()).then(
      (res) => {
        this.router.navigate(['/dash']);
        localStorage.setItem('accessToken', JSON.stringify(res.user?.uid));
      },
      (err) => {
        alert(err.message);
      }
    );
  }
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);
        console.log('Decoded token:', decodedToken); // Log the decoded token
        const userId = decodedToken.sub;
        return userId;
      } catch (error) {
        console.error('Error decoding JWT token:', error);
        return null;
      }
    } else {
      console.error('Access token not found in local storage.');
      return null;
    }
  }
}
function jwt_decode(token: string): any {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

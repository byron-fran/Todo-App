import { Injectable, computed, inject, signal, } from '@angular/core';
import { User } from './interfaces/User';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { AuthResponse } from './interfaces/AuthResponse';
import { AuthStatus } from './enums/AuthStatus';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(private http: HttpClient) {
    
    const token = localStorage.getItem('token')
    if (token) {
      this.checkAuth().subscribe()
    }
    
  };

  private router = inject(Router);
  
  private _authStatus = new BehaviorSubject<AuthStatus>(AuthStatus.checking);
  public authStatus$ = this._authStatus.asObservable()

  private _currentUser = signal<User | null>(null)
  public currentUser = computed(() => this._currentUser())


  private _errorLogin = signal<string>('')
  public errorLogin = computed(() => this._errorLogin())

  private _errorRegister = signal<string[]>([])
  public errorRegister = computed(() => this._errorRegister())

  private setAuthentication(user: User, token: string): boolean {

    this._currentUser.set(user);
    this._authStatus.next(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    return true;

  };

  public checkAuth(): Observable<boolean> {

    return this.http.get<AuthResponse>('/profile/')
      .pipe(
        map(({ token, user }) => this.setAuthentication(user, token)
        ),
        catchError((error: HttpErrorResponse) => {

          this._authStatus.next(AuthStatus.notAuthenticated);
          return of(false);
        })
      );
  };

  public register(user: User): Observable<boolean> {

    return this.http.post<AuthResponse>('/auth/register/', user)

      .pipe(

        map(({ token, user }) => {
          this._currentUser.set(user)
          return this.setAuthentication(user, token)
        }),

        catchError((error: HttpErrorResponse) => {

          this._errorRegister.set(Object.values(error.error))
          return of(false)

        })
      )
  };

  public login(email: string, password: string): Observable<boolean> {

    return this.http.post<AuthResponse>('/auth/login/', { email, password })
      .pipe(
        map(({ token, user }) => {
          if (user) { this.router.navigateByUrl('/tasks/list') }
          this._currentUser.set(user)
          return this.setAuthentication(user, token)
        }),
        catchError((error: HttpErrorResponse) => {
          this._errorLogin.set(error.error.message)
          return of(false)
        })
      )
  }

  // logout
  public logout() {

    localStorage.removeItem('token')
    this.router.navigateByUrl('/auth/login')
    this._currentUser.set(null)
    this._authStatus.next(AuthStatus.notAuthenticated)

  }
} 

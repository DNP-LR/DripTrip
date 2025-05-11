import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AuthState {
  isAuthenticated: boolean;
  user?: {
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authState = new BehaviorSubject<AuthState>({
    isAuthenticated: false
  });

  /**
   * Observable that emits the current authentication state
   */
  public readonly authState$: Observable<AuthState> = this._authState.asObservable();

  /**
   * Get the current authentication state
   */
  get authState(): AuthState {
    return this._authState.value;
  }

  /**
   * Get whether the user is authenticated
   */
  get isAuthenticated(): boolean {
    return this._authState.value.isAuthenticated;
  }

  /**
   * Login the user
   */
  login(email: string, password: string): void {
    // In a real application, this would make an API call
    // For now, we'll just simulate a successful login
    this._authState.next({
      isAuthenticated: true,
      user: {
        name: 'User',
        email: email
      }
    });
  }

  /**
   * Logout the user
   */
  logout(): void {
    this._authState.next({
      isAuthenticated: false
    });
  }
}

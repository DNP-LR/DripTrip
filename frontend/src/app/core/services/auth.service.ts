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
  providedIn: 'root',
})
export class AuthService {
  private readonly _authState: BehaviorSubject<AuthState> = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
  });


  public readonly authState$: Observable<AuthState> = this._authState.asObservable();


  get authState(): AuthState {
    return this._authState.value;
  }


  get isAuthenticated(): boolean {
    return this._authState.value.isAuthenticated;
  }


  public login(email: string, password: string): void {
    this._authState.next({
      isAuthenticated: true,
      user: {
        name: 'User',
        email: email,
      },
    });
  }

  public logout(): void {
    this._authState.next({
      isAuthenticated: false,
    });
  }
}

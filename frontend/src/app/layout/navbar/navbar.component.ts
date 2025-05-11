import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Subscription} from 'rxjs';
import {NavigationItem, NavigationService} from '../../core/services/navigation.service';
import {MenuState, MenuStateService} from '../../core/services/menu-state.service';
import {AuthService, AuthState} from '../../core/services/auth.service';
import {fadeAnimation, mobileMenuAnimation, enterLeaveAnimation} from '../../core/animations/animation.constants';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  animations: [
    fadeAnimation,
    mobileMenuAnimation,
    enterLeaveAnimation
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {
  public navigationItems: NavigationItem[] = [];
  public isMobileMenuOpen: boolean = false;
  public authState: AuthState = {isAuthenticated: false};
  public menuState: MenuState;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private _navigationService: NavigationService,
    private _menuStateService: MenuStateService,
    private _authService: AuthService
  ) {
    this.menuState = this._menuStateService['initialState'];
  }

  ngOnInit(): void {
    this.navigationItems = this._navigationService.getNavigationItems();

    this.subscriptions.add(
      this._menuStateService.menuState$.subscribe(state => {
        this.menuState = state;
        this.isMobileMenuOpen = state.mobileMenuOpen;
      })
    );

    this.subscriptions.add(
      this._authService.authState$.subscribe(state => {
        this.authState = state;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Close all dropdowns when clicking outside
    if (this.menuState.activeDropdown) {
      // Check if the click was inside a dropdown toggle button
      const clickedElement = event.target as HTMLElement;
      const isDropdownToggle = clickedElement.closest('[data-dropdown-toggle]');

      if (!isDropdownToggle) {
        this._menuStateService.closeAllDropdowns();
      }
    }
  }

  public toggleMobileMenu(): void {
    this._menuStateService.toggleMobileMenu();
  }

  public toggleDropdown(dropdownId: string, event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Close other dropdowns when opening a new one
    if (this.menuState.activeDropdown !== dropdownId) {
      this._menuStateService.closeAllDropdowns();
    }

    this._menuStateService.toggleDropdown(dropdownId);
  }

  public isDropdownActive(dropdownId: string): boolean {
    return this.menuState.activeDropdown === dropdownId;
  }

  public toggleLanguage(): void {
    this._menuStateService.toggleLanguage();
  }

  public toggleNotifications(): void {
    this._menuStateService.toggleNotifications();
  }

  public toggleUserProfile(): void {
    this._menuStateService.toggleUserProfile();
  }

  public login(): void {
    this._authService.login('user@example.com', 'password');
  }

  public logout(): void {
    this._authService.logout();
  }
}

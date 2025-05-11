import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface MenuState {
  mobileMenuOpen: boolean;
  activeDropdown: string | null;
  darkMode: boolean;
  language: 'en' | 'fr';
  accessibilityOptions: {
    largeFont: boolean;
    highContrast: boolean;
  };
  notificationsOpen: boolean;
  userProfileOpen: boolean;

  // Enhanced navbar properties
  isNavbarVisible: boolean;
  lastScrollPosition: number;
  isOnDarkBackground: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MenuStateService {
  private initialState: MenuState = {
    mobileMenuOpen: false,
    activeDropdown: null,
    darkMode: false,
    language: 'en',
    accessibilityOptions: {
      largeFont: false,
      highContrast: false
    },
    notificationsOpen: false,
    userProfileOpen: false,

    // Enhanced navbar default values
    isNavbarVisible: true,
    lastScrollPosition: 0,
    isOnDarkBackground: false
  };

  private _menuState = new BehaviorSubject<MenuState>(this.initialState);

  /**
   * Observable that emits the current state of the menu
   */
  public readonly menuState$: Observable<MenuState> = this._menuState.asObservable();

  /**
   * Observable that emits the current state of the mobile menu
   */
  public readonly mobileMenuOpen$: Observable<boolean> = new BehaviorSubject<boolean>(this.initialState.mobileMenuOpen).asObservable();

  /**
   * Get the current state of the mobile menu
   */
  get isMobileMenuOpen(): boolean {
    return this._menuState.value.mobileMenuOpen;
  }

  /**
   * Toggle the mobile menu state
   */
  toggleMobileMenu(): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      mobileMenuOpen: !currentState.mobileMenuOpen
    });
  }

  /**
   * Set the mobile menu state
   */
  setMobileMenuState(isOpen: boolean): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      mobileMenuOpen: isOpen
    });
  }

  /**
   * Toggle a dropdown menu
   */
  toggleDropdown(dropdownId: string): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      activeDropdown: currentState.activeDropdown === dropdownId ? null : dropdownId
    });
  }

  /**
   * Close all dropdowns
   */
  closeAllDropdowns(): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      activeDropdown: null,
      notificationsOpen: false,
      userProfileOpen: false
    });
  }

  /**
   * Toggle dark mode
   */
  toggleDarkMode(): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      darkMode: !currentState.darkMode
    });
  }

  /**
   * Toggle language
   */
  toggleLanguage(): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      language: currentState.language === 'en' ? 'fr' : 'en'
    });
  }

  /**
   * Toggle large font
   */
  toggleLargeFont(): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      accessibilityOptions: {
        ...currentState.accessibilityOptions,
        largeFont: !currentState.accessibilityOptions.largeFont
      }
    });
  }

  /**
   * Toggle high contrast
   */
  toggleHighContrast(): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      accessibilityOptions: {
        ...currentState.accessibilityOptions,
        highContrast: !currentState.accessibilityOptions.highContrast
      }
    });
  }

  /**
   * Toggle notifications
   */
  toggleNotifications(): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      notificationsOpen: !currentState.notificationsOpen,
      userProfileOpen: false // Close user profile when opening notifications
    });
  }

  /**
   * Toggle user profile
   */
  toggleUserProfile(): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      userProfileOpen: !currentState.userProfileOpen,
      notificationsOpen: false // Close notifications when opening user profile
    });
  }

  /**
   * Update navbar visibility based on scroll position
   * @param scrollPosition Current scroll position
   */
  updateNavbarVisibility(scrollPosition: number): void {
    const currentState = this._menuState.value;
    const isScrollingDown = scrollPosition > currentState.lastScrollPosition;

    // Only hide navbar when scrolling down and not at the top of the page
    const shouldHideNavbar = isScrollingDown && scrollPosition > 100;

    this._menuState.next({
      ...currentState,
      isNavbarVisible: !shouldHideNavbar,
      lastScrollPosition: scrollPosition
    });
  }

  /**
   * Update navbar styling based on background brightness
   * @param isOnDarkBackground Whether the navbar is over a dark background
   */
  updateNavbarBackground(isOnDarkBackground: boolean): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      isOnDarkBackground
    });
  }
}

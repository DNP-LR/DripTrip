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


  isNavbarVisible: boolean;
  lastScrollPosition: number;
  isOnDarkBackground: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MenuStateService {
  private readonly initialState: MenuState = {
    mobileMenuOpen: false,
    activeDropdown: null,
    darkMode: false,
    language: 'en',
    accessibilityOptions: {
      largeFont: false,
      highContrast: false,
    },
    notificationsOpen: false,
    userProfileOpen: false,


    isNavbarVisible: true,
    lastScrollPosition: 0,
    isOnDarkBackground: false,
  };
  /**
   * Observable that emits the current state of the mobile menu
   */
  public readonly mobileMenuOpen$: Observable<boolean> = new BehaviorSubject<boolean>(this.initialState.mobileMenuOpen).asObservable();
  private readonly _menuState = new BehaviorSubject<MenuState>(this.initialState);

  public readonly menuState$: Observable<MenuState> = this._menuState.asObservable();


  get isMobileMenuOpen(): boolean {
    return this._menuState.value.mobileMenuOpen;
  }


  public toggleMobileMenu(): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      mobileMenuOpen: !currentState.mobileMenuOpen,
    });
  }


  public setMobileMenuState(isOpen: boolean): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      mobileMenuOpen: isOpen,
    });
  }


  public toggleDropdown(dropdownId: string): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      activeDropdown: currentState.activeDropdown === dropdownId ? null : dropdownId,
    });
  }


  public closeAllDropdowns(): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      activeDropdown: null,
      notificationsOpen: false,
      userProfileOpen: false,
    });
  }


  public toggleDarkMode(): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      darkMode: !currentState.darkMode,
    });
  }


  public toggleLanguage(): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      language: currentState.language === 'en' ? 'fr' : 'en',
    });
  }


  public toggleLargeFont(): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      accessibilityOptions: {
        ...currentState.accessibilityOptions,
        largeFont: !currentState.accessibilityOptions.largeFont,
      },
    });
  }


  public toggleHighContrast(): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      accessibilityOptions: {
        ...currentState.accessibilityOptions,
        highContrast: !currentState.accessibilityOptions.highContrast,
      },
    });
  }


  public toggleNotifications(): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      notificationsOpen: !currentState.notificationsOpen,
      userProfileOpen: false, // Close user profile when opening notifications
    });
  }

  public toggleUserProfile(): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      userProfileOpen: !currentState.userProfileOpen,
      notificationsOpen: false, // Close notifications when opening user profile
    });
  }

  public updateNavbarVisibility(scrollPosition: number): void {
    const currentState: MenuState = this._menuState.value;
    const isScrollingDown: boolean = scrollPosition > currentState.lastScrollPosition;

    const shouldHideNavbar: boolean = isScrollingDown && scrollPosition > 100;

    this._menuState.next({
      ...currentState,
      isNavbarVisible: !shouldHideNavbar,
      lastScrollPosition: scrollPosition,
    });
  }

  public updateNavbarBackground(isOnDarkBackground: boolean): void {
    const currentState = this._menuState.value;
    this._menuState.next({
      ...currentState,
      isOnDarkBackground,
    });
  }
}

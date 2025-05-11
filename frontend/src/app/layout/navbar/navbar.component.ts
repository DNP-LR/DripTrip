import {Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2} from '@angular/core';
import {CommonModule, DOCUMENT, isPlatformBrowser} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Subscription} from 'rxjs';
import {NavigationItem, NavigationService} from '../../core/services/navigation.service';
import {MenuState, MenuStateService} from '../../core/services/menu-state.service';
import {AuthService, AuthState} from '../../core/services/auth.service';
import {enterLeaveAnimation, fadeAnimation, mobileMenuAnimation} from '../../core/animations/animation.constants';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  animations: [
    fadeAnimation,
    mobileMenuAnimation,
    enterLeaveAnimation,
    // Add a new animation for navbar visibility
    trigger('navbarVisibility', [
      state('visible', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      state('hidden', style({
        transform: 'translateY(-100%)',
        opacity: 0
      })),
      transition('visible <=> hidden', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {
  public navigationItems: NavigationItem[] = [];
  public isMobileMenuOpen: boolean = false;
  public authState: AuthState = {isAuthenticated: false};
  public menuState: MenuState;

  private subscriptions: Subscription = new Subscription();

  private scrollThrottleTimeout: any;
  private readonly throttleTime = 100; // ms

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _navigationService: NavigationService,
    private _menuStateService: MenuStateService,
    private _authService: AuthService,
    private elementRef: ElementRef,
    private renderer: Renderer2
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

    // Initialize background detection on page load
    // Use setTimeout to ensure the DOM is fully rendered
    setTimeout(() => {
      this.detectBackgroundBrightness();
    }, 100);
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

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Throttle scroll events
    if (!this.scrollThrottleTimeout) {
      this.scrollThrottleTimeout = setTimeout(() => {
        this.handleScroll();
        this.scrollThrottleTimeout = null;
      }, this.throttleTime);
    }
  }

  private handleScroll(): void {
    const scrollPosition = window.scrollY;

    // Update navbar visibility based on scroll position
    this._menuStateService.updateNavbarVisibility(scrollPosition);

    // Check if navbar is over a dark background
    this.detectBackgroundBrightness();
  }

  // private detectBackgroundBrightness(): void {
  //   // Get the element directly below the navbar
  //   const navbarHeight = this.elementRef.nativeElement.offsetHeight;
  //   const elementBelowNavbar = document.elementFromPoint(
  //     window.innerWidth / 2,
  //     navbarHeight + 5 // 5px below the navbar
  //   );
  //
  //   if (elementBelowNavbar) {
  //     // Get the background color of the element
  //     const bgColor = window.getComputedStyle(elementBelowNavbar).backgroundColor;
  //     const isOnDarkBackground = this.isDarkColor(bgColor);
  //
  //     // Update navbar styling based on background brightness
  //     this._menuStateService.updateNavbarBackground(isOnDarkBackground);
  //   }
  // }
  private detectBackgroundBrightness(): void {
    if (isPlatformBrowser(this.platformId)) {
      const navbarHeight = this.elementRef.nativeElement.offsetHeight;
      const elementBelowNavbar = this.document.elementFromPoint(
        window.innerWidth / 2,
        navbarHeight + 5 // 5px below the navbar
      );

      if (elementBelowNavbar) {
        const bgColor = window.getComputedStyle(elementBelowNavbar).backgroundColor;
        const isOnDarkBackground = this.isDarkColor(bgColor);
        this._menuStateService.updateNavbarBackground(isOnDarkBackground);
      }
    }
  }

  private isDarkColor(color: string): boolean {
    // Parse RGB values from the color string
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);

    if (rgbMatch) {
      const r = parseInt(rgbMatch[1], 10);
      const g = parseInt(rgbMatch[2], 10);
      const b = parseInt(rgbMatch[3], 10);

      // Calculate perceived brightness using the formula:
      // (0.299*R + 0.587*G + 0.114*B)
      const brightness = (0.299 * r + 0.587 * g + 0.114 * b);

      // If brightness is less than 128, consider it a dark background
      return brightness < 128;
    }

    return false;
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

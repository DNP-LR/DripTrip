import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationItem, NavigationService } from '../../core/services/navigation.service';
import { MenuState, MenuStateService } from '../../core/services/menu-state.service';
import { AuthService, AuthState } from '../../core/services/auth.service';
import { enterLeaveAnimation, fadeAnimation, mobileMenuAnimation } from '../../core/animations';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  animations: [
    fadeAnimation,
    mobileMenuAnimation,
    enterLeaveAnimation,
    trigger('navbarVisibility', [
      state('visible', style({
        transform: 'translateY(0)',
        opacity: 1,
      })),
      state('hidden', style({
        transform: 'translateY(-100%)',
        opacity: 0,
      })),
      transition('visible <=> hidden', [
        animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ]),
    ]),
  ],
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {
  public navigationItems: NavigationItem[] = [];
  public isMobileMenuOpen: boolean = false;
  public authState: AuthState = { isAuthenticated: false };
  public menuState: MenuState;

  private readonly subscriptions: Subscription = new Subscription();

  private scrollThrottleTimeout: any;
  private readonly throttleTime = 100;

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly _navigationService: NavigationService,
    private readonly _menuStateService: MenuStateService,
    private readonly _authService: AuthService,
    private readonly elementRef: ElementRef,
  ) {
    this.menuState = this._menuStateService['initialState'];
  }

  ngOnInit(): void {
    this.navigationItems = this._navigationService.getNavigationItems();

    this.subscriptions.add(
      this._menuStateService.menuState$.subscribe(state => {
        this.menuState = state;
        this.isMobileMenuOpen = state.mobileMenuOpen;
      }),
    );

    this.subscriptions.add(
      this._authService.authState$.subscribe(state => {
        this.authState = state;
      }),
    );

    setTimeout((): void => {
      this.detectBackgroundBrightness();
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.detectBackgroundBrightness();
    if (isPlatformBrowser(this.platformId)) {
      const observer = new MutationObserver((): void => {
        this.detectBackgroundBrightness();
      });
      observer.observe(this.document.body, {
        childList: true,
        attributes: true,
        subtree: true,
      });
      this.subscriptions.add({
        unsubscribe: (): void => observer.disconnect(),
      });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.menuState.activeDropdown) {
      const clickedElement = event.target as HTMLElement;
      const isDropdownToggle: Element | null = clickedElement.closest('[data-dropdown-toggle]');
      if (!isDropdownToggle) {
        this._menuStateService.closeAllDropdowns();
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!this.scrollThrottleTimeout) {
      this.scrollThrottleTimeout = setTimeout((): void => {
        this.handleScroll();
        this.scrollThrottleTimeout = null;
      }, this.throttleTime);
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

  private handleScroll(): void {
    const scrollPosition = window.scrollY;
    this._menuStateService.updateNavbarVisibility(scrollPosition);
    this.detectBackgroundBrightness();
  }

  // private detectBackgroundBrightness(): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     const navbarHeight = this.elementRef.nativeElement.offsetHeight;
  //     const elementBelowNavbar: Element | null = this.document.elementFromPoint(
  //       window.innerWidth / 2,
  //       navbarHeight + 5,
  //     );
  //
  //     if (elementBelowNavbar) {
  //       const bgColor: string = window.getComputedStyle(elementBelowNavbar).backgroundColor;
  //       const isOnDarkBackground: boolean = this.isDarkColor(bgColor);
  //       this._menuStateService.updateNavbarBackground(isOnDarkBackground);
  //     }
  //   }
  // }
  private detectBackgroundBrightness(): void {
    if (isPlatformBrowser(this.platformId)) {
      const navbarHeight = this.elementRef.nativeElement.offsetHeight;

      const checkPoints = [
        window.innerWidth / 4,
        window.innerWidth / 2,
        (window.innerWidth / 4) * 3,
      ];

      let darkBackgroundCount: number = 0;

      for (const x of checkPoints) {
        const elementBelowNavbar: Element | null = this.document.elementFromPoint(
          x,
          navbarHeight + 5,
        );

        if (elementBelowNavbar) {
          const bgColor = window.getComputedStyle(elementBelowNavbar).backgroundColor;
          if (this.isDarkColor(bgColor)) {
            darkBackgroundCount++;
          }
        }
      }

      const isOnDarkBackground: boolean = darkBackgroundCount > checkPoints.length / 2;
      this._menuStateService.updateNavbarBackground(isOnDarkBackground);
    }
  }

  private isDarkColor(color: string): boolean {

    const rgbMatch = RegExp(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/).exec(color);

    if (rgbMatch) {
      const r: number = parseInt(rgbMatch[1], 10);
      const g: number = parseInt(rgbMatch[2], 10);
      const b: number = parseInt(rgbMatch[3], 10);

      const brightness = (0.299 * r + 0.587 * g + 0.114 * b);

      return brightness < 128;
    }
    return false;
  }
}

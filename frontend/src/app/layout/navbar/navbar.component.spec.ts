import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';

import { NavbarComponent } from './navbar.component';
import { NavigationService } from '../../core/services/navigation.service';
import { MenuStateService, MenuState } from '../../core/services/menu-state.service';
import { AuthService, AuthState } from '../../core/services/auth.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let menuStateService: jasmine.SpyObj<MenuStateService>;
  let authService: jasmine.SpyObj<AuthService>;
  let navigationService: jasmine.SpyObj<NavigationService>;

  const mockMenuState: MenuState = {
    mobileMenuOpen: false,
    activeDropdown: null,
    darkMode: false,
    language: 'en',
    accessibilityOptions: {
      largeFont: false,
      highContrast: false
    },
    notificationsOpen: false,
    userProfileOpen: false
  };

  const mockAuthState: AuthState = {
    isAuthenticated: false
  };

  const mockNavigationItems = [
    { label: 'Home', path: '/' },
    {
      label: 'Discover',
      path: '/discover',
      children: [
        { label: 'Attractions', path: '/discover/attractions' }
      ]
    }
  ];

  beforeEach(async () => {
    const menuStateServiceSpy = jasmine.createSpyObj('MenuStateService', [
      'toggleMobileMenu',
      'toggleDropdown',
      'toggleDarkMode',
      'toggleLanguage',
      'toggleLargeFont',
      'toggleHighContrast',
      'toggleNotifications',
      'toggleUserProfile'
    ]);

    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'logout']);
    const navigationServiceSpy = jasmine.createSpyObj('NavigationService', ['getNavigationItems']);

    menuStateServiceSpy.menuState$ = new BehaviorSubject<MenuState>(mockMenuState);
    authServiceSpy.authState$ = new BehaviorSubject<AuthState>(mockAuthState);
    navigationServiceSpy.getNavigationItems.and.returnValue(mockNavigationItems);

    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule],
      providers: [
        { provide: MenuStateService, useValue: menuStateServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: NavigationService, useValue: navigationServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    menuStateService = TestBed.inject(MenuStateService) as jasmine.SpyObj<MenuStateService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    navigationService = TestBed.inject(NavigationService) as jasmine.SpyObj<NavigationService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get navigation items on init', () => {
    expect(navigationService.getNavigationItems).toHaveBeenCalled();
    expect(component.navigationItems).toEqual(mockNavigationItems);
  });

  it('should toggle mobile menu', () => {
    component.toggleMobileMenu();
    expect(menuStateService.toggleMobileMenu).toHaveBeenCalled();
  });

  it('should toggle dropdown', () => {
    const dropdownId = 'Discover';
    component.toggleDropdown(dropdownId);
    expect(menuStateService.toggleDropdown).toHaveBeenCalledWith(dropdownId);
  });

  it('should toggle dark mode', () => {
    component.toggleDarkMode();
    expect(menuStateService.toggleDarkMode).toHaveBeenCalled();
  });

  it('should toggle language', () => {
    component.toggleLanguage();
    expect(menuStateService.toggleLanguage).toHaveBeenCalled();
  });

  it('should toggle large font', () => {
    component.toggleLargeFont();
    expect(menuStateService.toggleLargeFont).toHaveBeenCalled();
  });

  it('should toggle high contrast', () => {
    component.toggleHighContrast();
    expect(menuStateService.toggleHighContrast).toHaveBeenCalled();
  });

  it('should toggle notifications', () => {
    component.toggleNotifications();
    expect(menuStateService.toggleNotifications).toHaveBeenCalled();
  });

  it('should toggle user profile', () => {
    component.toggleUserProfile();
    expect(menuStateService.toggleUserProfile).toHaveBeenCalled();
  });

  it('should login', () => {
    component.login();
    expect(authService.login).toHaveBeenCalled();
  });

  it('should logout', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });
});

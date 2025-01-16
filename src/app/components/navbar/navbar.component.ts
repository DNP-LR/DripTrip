import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class NavbarComponent {
  // Mobile menu state managed in constructor to ensure proper lifecycle management
  public isMobileMenuOpen: boolean;

  constructor() {
    // Initialize as false to prevent menu from being open on page load
    this.isMobileMenuOpen = false;
  }

  public toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}

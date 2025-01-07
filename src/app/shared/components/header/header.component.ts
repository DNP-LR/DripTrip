import { Component } from '@angular/core';
import { HeaderItems } from './model/HeaderItems';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public menuOpen = false;

  public headerItems: HeaderItems[] = [
    {
      id: 1,
      link: '/',
      title: 'Home',
    },
    {
      id: 3,
      link: '/about',
      title: 'About',
    },
    {
      id: 4,
      link: '/contact',
      title: 'Contact',
    },
  ];

  public toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden', !this.menuOpen);
    }
  }
}

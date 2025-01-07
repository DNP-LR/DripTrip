import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from './model/footer';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  public footerItems: Footer[] = [
    {
      title: 'Privacy Policy',
      link: '/Privacy Policy',
      id: 1,
    },
    {
      title: 'Terms of Service',
      link: '/Terms of Service',
      id: 2,
    },
    {
      title: 'Contact Us',
      link: '/contact',
      id: 3,
    },
  ];
}

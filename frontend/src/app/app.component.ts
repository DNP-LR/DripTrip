import {Component} from '@angular/core';
import {FooterComponent} from './layout/footer/footer.component';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FooterComponent,
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title: string = 'DripTrip';
}

import {Component} from '@angular/core';
import {HeroesComponent} from '../../layout/heroes/heroes.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroesComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}

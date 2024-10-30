import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './shared/components/button/button.component';
import { InputFieldComponent } from './shared/components/input-field/input-field.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, InputFieldComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public title = 'DripTrip';

  constructor() {
    this.title = 'DripTrip';
  }

  public ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}

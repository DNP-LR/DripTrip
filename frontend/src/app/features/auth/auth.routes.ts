import {Routes} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
    pathMatch: 'full',
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
];

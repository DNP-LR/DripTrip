import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationService } from './services/navigation.service';
import { MenuStateService } from './services/menu-state.service';
import { AuthService } from './services/auth.service';

/**
 * Core module for application-wide singleton services
 * This module should be imported only once in the AppModule
 */
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    NavigationService,
    MenuStateService,
    AuthService
  ]
})
export class CoreModule {
  /**
   * Constructor to prevent importing CoreModule more than once
   * @param parentModule Reference to CoreModule if it has already been loaded
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it only in the AppModule.');
    }
  }
}

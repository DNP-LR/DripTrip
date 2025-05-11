# Animation Constants

This file provides a set of reusable animation constants that can be directly imported and used in Angular components.

## Usage

### Basic Usage

1. Import the animations you need in your component:

```typescript
import { Component } from '@angular/core';
import { 
  Animation, 
  fadeAnimation, 
  dropdownAnimation, 
  mobileMenuAnimation 
} from '../../core/animations';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  animations: [
    fadeAnimation,
    dropdownAnimation,
    mobileMenuAnimation
  ]
})
export class ExampleComponent {
  // Component logic
}
```

2. Apply animations in your template:

```html
<div [@fadeAnimation]="isVisible ? '1' : '0'">
  This content will fade in and out
</div>

<div [@dropdownAnimation]="isDropdownOpen ? '1' : '0'">
  This dropdown will slide down and up
</div>

<div [@mobileMenuAnimation]="isMobileMenuOpen ? '1' : '0'">
  This mobile menu will slide in from the right
</div>
```

### Available Animations

#### State-Based Animations

- `openClose`: Toggle between open and closed states
- `enabledStateChange`: Toggle between default and disabled states
- `hoverIcons`: Toggle between normal and hover states
- `menuAnimation`: Toggle between active and inactive states
- `bounce`: Subtle bounce effect between active and inactive states

#### Numeric State Animations (0/1)

- `fadeAnimation`: Fade in/out based on opacity
- `dropdownAnimation`: Dropdown with translation and opacity
- `mobileMenuAnimation`: Mobile menu sliding from right

### Animation States

Use the `Animation` enum for consistent state naming:

```typescript
import { Animation } from '../../core/animations';

// In your component
menuState = Animation.INACTIVE;

// Later
menuState = Animation.ACTIVE;
```

Available states:
- `Animation.OPEN`
- `Animation.CLOSED`
- `Animation.ACTIVE`
- `Animation.INACTIVE`

### Reusable Parameterized Animations

You can use the `transitionAnimation` with `useAnimation` to create parameterized animations:

```typescript
import { trigger, transition, useAnimation } from '@angular/animations';
import { transitionAnimation } from '../../core/animations';

// In your component metadata
animations: [
  trigger('customAnimation', [
    transition('inactive => active', [
      useAnimation(transitionAnimation, {
        params: {
          height: '300px',
          opacity: 1,
          backgroundColor: 'blue',
          time: '0.5s',
        },
      }),
    ]),
  ]),
]
```

## Example: Navbar Component

The navbar component demonstrates how to use these animations:

```typescript
// In navbar.component.ts
import { Component } from '@angular/core';
import { fadeAnimation, dropdownAnimation, mobileMenuAnimation } from '../../core/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  animations: [
    fadeAnimation,
    dropdownAnimation,
    mobileMenuAnimation
  ]
})
export class NavbarComponent {
  // Component logic
}
```

Example HTML usage in navbar.component.html:

```
<!-- Dropdown menu with animation -->
<div *ngIf="isDropdownActive('dropdown1')"
     [@dropdownAnimation]="isDropdownActive('dropdown1') ? '1' : '0'"
     class="dropdown-menu">
  <!-- Dropdown content -->
</div>

<!-- Mobile menu with animation -->
<div *ngIf="isMobileMenuOpen"
     [@mobileMenuAnimation]="isMobileMenuOpen ? '1' : '0'"
     class="mobile-menu">
  <!-- Mobile menu content -->
</div>
```

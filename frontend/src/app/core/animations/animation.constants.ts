import {animate, animation, state, style, transition, trigger, useAnimation} from "@angular/animations";

/**
 * Animation state enum
 */
export enum Animation {
  OPEN = 'open',
  CLOSED = 'closed',
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

/**
 * Reusable transition animation that can be parameterized
 */
export const transitionAnimation = animation([
  style({
    height: '{{height}}',
    opacity: '{{opacity}}',
    backgroundColor: '{{backgroundColor}}',
    shadow: '{{shadow}}',
  }),
  animate('{{time}}')
]);

/**
 * Open/close animation with transition animation
 */
export const triggerAnimation = trigger('openClose', [
  transition('open => closed', [
    useAnimation(transitionAnimation, {
      params: {
        height: 0,
        opacity: 1,
        backgroundColor: 'red',
        time: '1s',
      },
    }),
  ]),
]);

/**
 * Standard open/close animation
 */
export const openClose = trigger('openClose', [
  state(Animation.OPEN, style({
    height: '200px',
    opacity: 1,
    backgroundColor: '#456454',
  })),
  state('closed', style({
    height: '100px',
    opacity: 0.8,
    backgroundColor: '#656533',
  })),
  transition('open => closed', [animate('1s')]),
  transition('closed => open', [animate('0.5s')]),
]);

/**
 * Animation for enabled/disabled state changes
 */
export const enabledStateChange = trigger('enabledStateChange', [
  state('default', style({
    opacity: 1
  })),
  state('disabled', style({
    opacity: 0.5,
    backgroundColor: '#656533',
    shadow: '#656533',
  })),
  transition('disabled => default', animate('300ms ease-in-out')),
  transition('default => disabled', [animate('0.5s')]),
]);

/**
 * Animation for hover effects on icons
 */
export const hoverIcons = trigger('hoverIcons', [
  state('normal', style({
    transform: 'scale(1)',
    filter: 'brightness(1)'
  })),
  state('hover', style({
    transform: 'scale(1.1)',
    filter: 'brightness(1.2)'
  })),
  transition('normal => hover', [
    animate('0.3s ease-in-out')
  ]),
  transition('hover => normal', [
    animate('0.3s ease-in-out')
  ])
]);

/**
 * Animation for menu items
 */
export const menuAnimation = trigger('menuAnimation', [
  state(Animation.INACTIVE, style({
      transform: 'scale(1)',
      filter: 'brightness(1)',
      opacity: 1,
    }),
  ),
  state(Animation.ACTIVE, style({
    transform: 'scale(1.1)',
    filter: 'brightness(1.2)',
    opacity: 1,
  })),
  transition(`${Animation.INACTIVE} => ${Animation.ACTIVE}`, [
    animate('0.3s ease-in-out')
  ]),
  transition('active => inactive', [
    animate('0.4s ease-in-out')
  ])
]);

/**
 * Bounce animation for subtle feedback
 */
export const bounce = trigger('bounce', [
  state(Animation.INACTIVE, style({
    transform: 'scale(1)',
  })),
  state(Animation.ACTIVE, style({
    transform: 'scale(1.01)',
  })),
  transition('* => *', [
    animate('0.1s ease-in-out')
  ])
]);

/**
 * Fade animation for opacity transitions
 */
export const fadeAnimation = trigger('fadeAnimation', [
  state('0', style({opacity: 0})),
  state('1', style({opacity: 1})),
  transition('0 => 1', [animate('300ms ease-in-out')]),
  transition('1 => 0', [animate('300ms ease-in-out')])
]);

/**
 * Dropdown animation with translation, opacity and background color change
 */
export const dropdownAnimation = trigger('dropdownAnimation', [
  state('0', style({opacity: 0, transform: 'translateY(-20px)'})),
  state('1', style({opacity: 1, transform: 'translateY(0)'})),
  transition('0 => 1', [animate('700ms cubic-bezier(0.175, 0.885, 0.32, 1.275)')]),
  transition('1 => 0', [animate('200ms ease-in')])
]);

/**
 * Mobile menu animation with slide from right
 */
export const mobileMenuAnimation = trigger('mobileMenuAnimation', [
  state('0', style({transform: 'translateX(100%)', opacity: 0})),
  state('1', style({transform: 'translateX(0)', opacity: 1})),
  transition('0 => 1', [animate('250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')]),
  transition('1 => 0', [animate('200ms ease-in')])
]);

/**
 * Animation for elements entering and leaving the DOM
 */
export const enterLeaveAnimation = trigger('enterLeaveAnimation', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(-20px)'}),
    animate('300ms ease-out', style({opacity: 1, transform: 'translateY(0)'}))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({opacity: 0, transform: 'translateY(-20px)'}))
  ])
]);

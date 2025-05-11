import { AnimationTriggerMetadata } from '@angular/animations';

/**
 * Animation options interface for configuring animations
 */
export interface AnimationOptions {
  duration?: string;
  delay?: string;
  easing?: string;
}

/**
 * Base animation definition interface following Interface Segregation Principle
 */
export interface AnimationDefinition {
  readonly triggerName: string;
  getAnimationTrigger(options?: AnimationOptions): AnimationTriggerMetadata;
}

/**
 * Entrance animation interface
 */
export interface EntranceAnimation {
  getEntranceAnimation(options?: AnimationOptions): AnimationTriggerMetadata;
}

/**
 * Exit animation interface
 */
export interface ExitAnimation {
  getExitAnimation(options?: AnimationOptions): AnimationTriggerMetadata;
}

/**
 * Toggle animation interface
 */
export interface ToggleAnimation {
  getToggleAnimation(options?: AnimationOptions): AnimationTriggerMetadata;
}

/**
 * Default animation timing values
 */
export const DEFAULT_ANIMATION_TIMING = {
  DURATION: '300ms',
  DELAY: '0ms',
  EASING: 'ease-in-out'
};

/**
 * Animation direction enum
 */
export enum AnimationDirection {
  Left = 'left',
  Right = 'right',
  Up = 'up',
  Down = 'down'
}

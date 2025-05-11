import { trigger, state, style, animate, transition, AnimationTriggerMetadata } from '@angular/animations';
import {
  AnimationDefinition,
  AnimationDirection,
  AnimationOptions,
  DEFAULT_ANIMATION_TIMING,
  EntranceAnimation,
  ExitAnimation,
  ToggleAnimation
} from './animation.model';

/**
 * Slide animation implementation
 * Implements multiple animation interfaces to provide different types of slide animations
 */
export class SlideAnimation implements AnimationDefinition, EntranceAnimation, ExitAnimation, ToggleAnimation {
  readonly triggerName: string;
  private direction: AnimationDirection;

  /**
   * Constructor
   * @param direction Direction of the slide animation
   * @param name Optional custom trigger name
   */
  constructor(direction: AnimationDirection = AnimationDirection.Right, name: string = 'slide') {
    this.triggerName = name;
    this.direction = direction;
  }

  /**
   * Get initial style based on direction
   * @returns Style object with transform property
   */
  private getInitialStyle(): { transform: string } {
    switch (this.direction) {
      case AnimationDirection.Left:
        return { transform: 'translateX(-100%)' };
      case AnimationDirection.Right:
        return { transform: 'translateX(100%)' };
      case AnimationDirection.Up:
        return { transform: 'translateY(-100%)' };
      case AnimationDirection.Down:
        return { transform: 'translateY(100%)' };
      default:
        return { transform: 'translateX(100%)' };
    }
  }

  /**
   * Get the main animation trigger
   * @param options Animation options
   * @returns Animation trigger metadata
   */
  getAnimationTrigger(options?: AnimationOptions): AnimationTriggerMetadata {
    const duration = options?.duration || DEFAULT_ANIMATION_TIMING.DURATION;
    const easing = options?.easing || DEFAULT_ANIMATION_TIMING.EASING;
    const delay = options?.delay || DEFAULT_ANIMATION_TIMING.DELAY;
    const initialStyle = this.getInitialStyle();

    return trigger(this.triggerName, [
      state('void', style(initialStyle)),
      state('*', style({ transform: 'translate(0)' })),
      transition(':enter', [
        style(initialStyle),
        animate(`${duration} ${delay} ${easing}`)
      ]),
      transition(':leave', [
        animate(`${duration} ${delay} ${easing}`, style(initialStyle))
      ]),
      transition('0 => 1', [
        style(initialStyle),
        animate(`${duration} ${delay} ${easing}`)
      ]),
      transition('1 => 0', [
        animate(`${duration} ${delay} ${easing}`, style(initialStyle))
      ])
    ]);
  }

  /**
   * Get entrance animation (slide in)
   * @param options Animation options
   * @returns Animation trigger metadata
   */
  getEntranceAnimation(options?: AnimationOptions): AnimationTriggerMetadata {
    const duration = options?.duration || DEFAULT_ANIMATION_TIMING.DURATION;
    const easing = options?.easing || DEFAULT_ANIMATION_TIMING.EASING;
    const delay = options?.delay || DEFAULT_ANIMATION_TIMING.DELAY;
    const initialStyle = this.getInitialStyle();

    return trigger(`${this.triggerName}In`, [
      transition(':enter', [
        style(initialStyle),
        animate(`${duration} ${delay} ${easing}`, style({ transform: 'translate(0)' }))
      ])
    ]);
  }

  /**
   * Get exit animation (slide out)
   * @param options Animation options
   * @returns Animation trigger metadata
   */
  getExitAnimation(options?: AnimationOptions): AnimationTriggerMetadata {
    const duration = options?.duration || DEFAULT_ANIMATION_TIMING.DURATION;
    const easing = options?.easing || DEFAULT_ANIMATION_TIMING.EASING;
    const delay = options?.delay || DEFAULT_ANIMATION_TIMING.DELAY;
    const initialStyle = this.getInitialStyle();

    return trigger(`${this.triggerName}Out`, [
      transition(':leave', [
        animate(`${duration} ${delay} ${easing}`, style(initialStyle))
      ])
    ]);
  }

  /**
   * Get toggle animation (slide in/out)
   * @param options Animation options
   * @returns Animation trigger metadata
   */
  getToggleAnimation(options?: AnimationOptions): AnimationTriggerMetadata {
    const duration = options?.duration || DEFAULT_ANIMATION_TIMING.DURATION;
    const easing = options?.easing || DEFAULT_ANIMATION_TIMING.EASING;
    const delay = options?.delay || DEFAULT_ANIMATION_TIMING.DELAY;
    const initialStyle = this.getInitialStyle();

    return trigger(`${this.triggerName}Toggle`, [
      state('0', style(initialStyle)),
      state('1', style({ transform: 'translate(0)' })),
      transition('0 => 1', [
        animate(`${duration} ${delay} ${easing}`)
      ]),
      transition('1 => 0', [
        animate(`${duration} ${delay} ${easing}`)
      ])
    ]);
  }
}

/**
 * Factory function to create a slide animation instance
 * @param direction Direction of the slide animation
 * @param name Optional custom trigger name
 * @returns SlideAnimation instance
 */
export function createSlideAnimation(direction?: AnimationDirection, name?: string): SlideAnimation {
  return new SlideAnimation(direction, name);
}

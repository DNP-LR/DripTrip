import { trigger, state, style, animate, transition, AnimationTriggerMetadata } from '@angular/animations';
import { AnimationDefinition, AnimationOptions, DEFAULT_ANIMATION_TIMING, EntranceAnimation, ExitAnimation, ToggleAnimation } from './animation.model';

/**
 * Fade animation implementation
 * Implements multiple animation interfaces to provide different types of fade animations
 */
export class FadeAnimation implements AnimationDefinition, EntranceAnimation, ExitAnimation, ToggleAnimation {
  readonly triggerName: string;

  /**
   * Constructor
   * @param name Optional custom trigger name
   */
  constructor(name: string = 'fade') {
    this.triggerName = name;
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

    return trigger(this.triggerName, [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(`${duration} ${delay} ${easing}`)
      ]),
      transition(':leave', [
        animate(`${duration} ${delay} ${easing}`, style({ opacity: 0 }))
      ]),
      transition('0 => 1', [
        style({ opacity: 0 }),
        animate(`${duration} ${delay} ${easing}`)
      ]),
      transition('1 => 0', [
        animate(`${duration} ${delay} ${easing}`, style({ opacity: 0 }))
      ])
    ]);
  }

  /**
   * Get entrance animation (fade in)
   * @param options Animation options
   * @returns Animation trigger metadata
   */
  getEntranceAnimation(options?: AnimationOptions): AnimationTriggerMetadata {
    const duration = options?.duration || DEFAULT_ANIMATION_TIMING.DURATION;
    const easing = options?.easing || DEFAULT_ANIMATION_TIMING.EASING;
    const delay = options?.delay || DEFAULT_ANIMATION_TIMING.DELAY;

    return trigger(`${this.triggerName}In`, [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(`${duration} ${delay} ${easing}`, style({ opacity: 1 }))
      ])
    ]);
  }

  /**
   * Get exit animation (fade out)
   * @param options Animation options
   * @returns Animation trigger metadata
   */
  getExitAnimation(options?: AnimationOptions): AnimationTriggerMetadata {
    const duration = options?.duration || DEFAULT_ANIMATION_TIMING.DURATION;
    const easing = options?.easing || DEFAULT_ANIMATION_TIMING.EASING;
    const delay = options?.delay || DEFAULT_ANIMATION_TIMING.DELAY;

    return trigger(`${this.triggerName}Out`, [
      transition(':leave', [
        animate(`${duration} ${delay} ${easing}`, style({ opacity: 0 }))
      ])
    ]);
  }

  /**
   * Get toggle animation (fade in/out)
   * @param options Animation options
   * @returns Animation trigger metadata
   */
  getToggleAnimation(options?: AnimationOptions): AnimationTriggerMetadata {
    const duration = options?.duration || DEFAULT_ANIMATION_TIMING.DURATION;
    const easing = options?.easing || DEFAULT_ANIMATION_TIMING.EASING;
    const delay = options?.delay || DEFAULT_ANIMATION_TIMING.DELAY;

    return trigger(`${this.triggerName}Toggle`, [
      state('0', style({ opacity: 0 })),
      state('1', style({ opacity: 1 })),
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
 * Factory function to create a fade animation instance
 * @param name Optional custom trigger name
 * @returns FadeAnimation instance
 */
export function createFadeAnimation(name?: string): FadeAnimation {
  return new FadeAnimation(name);
}

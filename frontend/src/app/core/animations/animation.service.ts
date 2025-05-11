import { Injectable } from '@angular/core';
import { AnimationTriggerMetadata } from '@angular/animations';

import {
  AnimationDefinition,
  AnimationDirection,
  AnimationOptions,
  DEFAULT_ANIMATION_TIMING,
  EntranceAnimation,
  ExitAnimation,
  ToggleAnimation
} from './animation.model';
import { FadeAnimation, createFadeAnimation } from './fade.animation';
import { SlideAnimation, createSlideAnimation } from './slide.animation';

/**
 * Animation service that provides access to reusable animations
 * Following the Factory and Strategy patterns
 */
@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private animations: Map<string, AnimationDefinition> = new Map();

  constructor() {
    // Register default animations
    this.registerAnimation('fade', createFadeAnimation());
    this.registerAnimation('slideRight', createSlideAnimation(AnimationDirection.Right));
    this.registerAnimation('slideLeft', createSlideAnimation(AnimationDirection.Left));
    this.registerAnimation('slideUp', createSlideAnimation(AnimationDirection.Up));
    this.registerAnimation('slideDown', createSlideAnimation(AnimationDirection.Down));
  }

  /**
   * Register a new animation
   * @param name Name of the animation
   * @param animation Animation definition
   */
  registerAnimation(name: string, animation: AnimationDefinition): void {
    this.animations.set(name, animation);
  }

  /**
   * Get an animation by name
   * @param name Name of the animation
   * @returns Animation definition or undefined if not found
   */
  getAnimation(name: string): AnimationDefinition | undefined {
    return this.animations.get(name);
  }

  /**
   * Get animation trigger by name
   * @param name Name of the animation
   * @param options Animation options
   * @returns Animation trigger metadata or undefined if animation not found
   */
  getAnimationTrigger(name: string, options?: AnimationOptions): AnimationTriggerMetadata | undefined {
    const animation = this.getAnimation(name);
    return animation?.getAnimationTrigger(options);
  }

  /**
   * Create a fade animation
   * @param name Optional custom trigger name
   * @returns FadeAnimation instance
   */
  createFadeAnimation(name?: string): FadeAnimation {
    return createFadeAnimation(name);
  }

  /**
   * Create a slide animation
   * @param direction Direction of the slide animation
   * @param name Optional custom trigger name
   * @returns SlideAnimation instance
   */
  createSlideAnimation(direction?: AnimationDirection, name?: string): SlideAnimation {
    return createSlideAnimation(direction, name);
  }

  /**
   * Get fade in animation
   * @param options Animation options
   * @returns Animation trigger metadata
   */
  getFadeInAnimation(options?: AnimationOptions): AnimationTriggerMetadata {
    const animation = this.getAnimation('fade') as FadeAnimation & EntranceAnimation;
    return animation.getEntranceAnimation(options);
  }

  /**
   * Get fade out animation
   * @param options Animation options
   * @returns Animation trigger metadata
   */
  getFadeOutAnimation(options?: AnimationOptions): AnimationTriggerMetadata {
    const animation = this.getAnimation('fade') as FadeAnimation & ExitAnimation;
    return animation.getExitAnimation(options);
  }

  /**
   * Get fade toggle animation
   * @param options Animation options
   * @returns Animation trigger metadata
   */
  getFadeToggleAnimation(options?: AnimationOptions): AnimationTriggerMetadata {
    const animation = this.getAnimation('fade') as FadeAnimation & ToggleAnimation;
    return animation.getToggleAnimation(options);
  }

  /**
   * Get slide in animation
   * @param direction Direction of the slide animation
   * @param options Animation options
   * @returns Animation trigger metadata
   */
  getSlideInAnimation(direction: AnimationDirection = AnimationDirection.Right, options?: AnimationOptions): AnimationTriggerMetadata {
    const name = `slide${direction.charAt(0).toUpperCase() + direction.slice(1)}`;
    const animation = this.getAnimation(name) as SlideAnimation & EntranceAnimation;
    return animation.getEntranceAnimation(options);
  }

  /**
   * Get slide out animation
   * @param direction Direction of the slide animation
   * @param options Animation options
   * @returns Animation trigger metadata
   */
  getSlideOutAnimation(direction: AnimationDirection = AnimationDirection.Right, options?: AnimationOptions): AnimationTriggerMetadata {
    const name = `slide${direction.charAt(0).toUpperCase() + direction.slice(1)}`;
    const animation = this.getAnimation(name) as SlideAnimation & ExitAnimation;
    return animation.getExitAnimation(options);
  }

  /**
   * Get slide toggle animation
   * @param direction Direction of the slide animation
   * @param options Animation options
   * @returns Animation trigger metadata
   */
  getSlideToggleAnimation(direction: AnimationDirection = AnimationDirection.Right, options?: AnimationOptions): AnimationTriggerMetadata {
    const name = `slide${direction.charAt(0).toUpperCase() + direction.slice(1)}`;
    const animation = this.getAnimation(name) as SlideAnimation & ToggleAnimation;
    return animation.getToggleAnimation(options);
  }
}

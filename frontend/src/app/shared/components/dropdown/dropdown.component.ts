import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnimationDirection, AnimationOptions} from '../../../core/animations/animation.model';
import {fadeAnimation} from '../../../core/animations/animation.constants';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  animations: [
    fadeAnimation
  ]
})
export class DropdownComponent {
  @Input() label: string = '';
  @Input() placeholder: string = 'Select an option';
  @Input() options: any[] = [];
  @Input() optionLabel: string = 'label';
  @Input() optionValue: string = 'value';
  @Input() selectedValue: any = null;
  @Input() animationType: 'fade' | 'slide' = 'slide';
  @Input() animationDirection: AnimationDirection = AnimationDirection.Down;
  @Input() customAnimationOptions?: AnimationOptions;
  @Input() customTemplate?: TemplateRef<any>;

  @Output() selectionChange = new EventEmitter<any>();
  @Output() selectedValueChange = new EventEmitter<any>();

  public isOpen: boolean = false;

  public toggle(): void {
    this.isOpen = !this.isOpen;
  }

  public select(option: any): void {
    this.selectedValue = this.optionValue ? option[this.optionValue] : option;
    this.selectionChange.emit(this.selectedValue);
    this.selectedValueChange.emit(this.selectedValue);
    this.isOpen = false;
  }

  public getDisplayLabel(): string {
    if (!this.selectedValue || !this.options.length) {
      return this.placeholder;
    }

    const selectedOption = this.options.find(option =>
      (this.optionValue ? option[this.optionValue] : option) === this.selectedValue
    );

    return selectedOption ?
      (this.optionLabel ? selectedOption[this.optionLabel] : selectedOption.toString()) :
      this.placeholder;
  }

  public getAnimationState(): string {
    return this.isOpen ? '1' : '0';
  }
}

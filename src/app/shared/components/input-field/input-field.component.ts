import { Component, forwardRef, Input } from '@angular/core';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { Warning } from 'postcss';

@Component({
  selector: 'app-input-field',
  imports: [NgOptimizedImage, FormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent {
  @Input() public label = '';
  @Input() public type = 'text';
  @Input() public placeholder = 'Placeholder';
  @Input() public disabled = false;
  @Input() public required = false;
  @Input() public formControl!: FormControl;
  @Input() public image = '';
  public isDisabled = false;

  public _value = '';

  private onChange(event: string): void {
    throw new Warning(event);
  }

  private onTouched(): void {
    throw null;
  }

  public updateValue(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this._value = inputElement.value;
    this.onChange(this._value);
    this.onTouched();
  }

  private registerOnChange(fn: never): void {
    this.onChange = fn;
  }

  private registerOnTouched(fn: never): void {
    this.onTouched = fn;
  }

  private setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}

import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNumberFormat]',
  standalone:true
})
export class NumberFormatDirective {

  private decimalSeparator = '.';
  private thousandsSeparator = ',';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    let value = event.target.value;
    value = value.replace(/,/g, ''); // Remove commas for processing
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      const formattedValue = numericValue.toLocaleString();
      this.renderer.setProperty(this.el.nativeElement, 'value', formattedValue);
    }
  }

  @HostListener('blur', ['$event']) onBlur(event: any) {
    // Optionally, handle the formatting when the input loses focus
    const value = event.target.value;
    const numericValue = parseFloat(value.replace(/,/g, ''));
    if (!isNaN(numericValue)) {
      const formattedValue = numericValue.toLocaleString();
      this.renderer.setProperty(this.el.nativeElement, 'value', formattedValue);
    }
  }
}

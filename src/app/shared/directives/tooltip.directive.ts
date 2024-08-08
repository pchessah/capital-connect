import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone:true
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText: string = ''; // Default to an empty string if not provided
  tooltipElement: HTMLElement | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipElement && this.tooltipText) {
      this.tooltipElement = this.renderer.createElement('span');
      this.renderer.appendChild(
        this.tooltipElement,
        this.renderer.createText(this.tooltipText)
      );
      this.renderer.appendChild(document.body, this.tooltipElement);
      this.renderer.addClass(this.tooltipElement, 'tooltip');
      this.setPosition();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = undefined;
    }
  }

  setPosition() {
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltipElement?.getBoundingClientRect();

    if (tooltipPos) {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

      const top = hostPos.top - tooltipPos.height - 10 + scrollPos;
      const left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;

      this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
      this.renderer.setStyle(this.tooltipElement, 'right', `30%`);
    }
  }
}

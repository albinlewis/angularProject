import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

/**
 * Display an element after x milliseconds --> e.g. loader screens
 */

@Directive({
  selector: '[appTimeout]'
})
export class TimeoutDirective implements  AfterViewInit {

  @Input() timeout: number;
  displayStyle: string;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    let styles = getComputedStyle(this.el.nativeElement);
    this.displayStyle = styles.display
    
    if (this.timeout) {
      this.hide();
      setTimeout(() => {
        this.show();
      }, this.timeout);
    }
  }

  hide() {
    this.el.nativeElement.style.display = 'none';
  }

  show() {
    this.el.nativeElement.style.display = this.displayStyle;
  }
}

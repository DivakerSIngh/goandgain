import { Directive,ElementRef,HostListener,Renderer2   } from '@angular/core';

@Directive({
  selector: '[validattionDirective]'
})
export class ValidattionDirective {

constructor(private el: ElementRef, private renderer: Renderer2) {
   // el.nativeElement.style.backgroundColor = 'white';
 }

 @HostListener('focus') setInputFocus() {
  //this.el.nativeElement.class = 'ng-dirty'; 
  this.renderer.addClass(this.el.nativeElement, 'myValidationClass');
 /// this.renderer.removeClass(this.el.nativeElement, 'ng-untouched');
}

@HostListener('blur') setInputFocusOut(el: ElementRef) {
  //this.el.nativeElement.style.backgroundColor = 'white';
  this.renderer.removeClass(this.el.nativeElement, 'myValidationClass'); 
  // this.renderer.removeClass(this.el.nativeElement, 'ng-touched'); 
  // this.renderer.addClass(this.el.nativeElement, 'ng-untouched');
}

}

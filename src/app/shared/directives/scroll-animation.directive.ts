import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, Inject, Input, PLATFORM_ID, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]'
})
export class ScrollAnimationDirective {
 @Input('appScrollAnimation') animationClass: string = 'fade-in';
  private observer!: IntersectionObserver;
  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId); // ✅ نحدد لو هو browser
    if (this.isBrowser) {
      this.renderer.addClass(this.el.nativeElement, 'before-animation');
    }
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return; // ❌ لو مش متصفح، اخرج فورًا

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.removeClass(this.el.nativeElement, 'before-animation');
          requestAnimationFrame(() => {
            this.renderer.addClass(this.el.nativeElement, this.animationClass);
          });
        } else {
          this.renderer.removeClass(this.el.nativeElement, this.animationClass);
          this.renderer.addClass(this.el.nativeElement, 'before-animation');
        }
      });
    }, {
      threshold: 0.1
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.observer) {
      this.observer.disconnect();
    }
  }

}

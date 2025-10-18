import { Directive, ElementRef, input, OnInit, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: 'img[appLazyImage]',
  standalone: true
})
export class LazyImageDirective implements OnInit {
  src = input.required<string>({ alias: 'appLazyImage' });
  placeholder = input<string>('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"%3E%3Crect fill="%23111827" width="300" height="300"/%3E%3Ctext fill="%2300ff9f" font-family="Arial" font-size="20" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ECarregando...%3C/text%3E%3C/svg%3E');

  private observer?: IntersectionObserver;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(private el: ElementRef<HTMLImageElement>) {
    effect(() => {
      const newSrc = this.src();
      if (newSrc && this.isIntersecting && this.isBrowser) {
        this.loadImage(newSrc);
      }
    });
  }

  private isIntersecting = false;

  ngOnInit(): void {
    this.el.nativeElement.src = this.placeholder();
    
    if (!this.isBrowser) {
      this.el.nativeElement.src = this.src();
      return;
    }
    
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isIntersecting = true;
            this.loadImage(this.src());
            this.observer?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  private loadImage(src: string): void {
    if (!this.isBrowser) return;
    
    const img = new Image();
    img.onload = () => {
      this.el.nativeElement.src = src;
      this.el.nativeElement.classList.add('lazy-loaded');
    };
    img.onerror = () => {
      this.el.nativeElement.src = 'https://via.placeholder.com/300x300?text=Erro+ao+carregar';
      this.el.nativeElement.classList.add('lazy-error');
    };
    img.src = src;
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.observer?.disconnect();
    }
  }
}

import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="modal-backdrop" 
      *ngIf="isOpen"
      [@fadeIn]
      (click)="onBackdropClick($event)"
    >
      <div 
        class="modal" 
        [@slideIn]
        [class.modal--large]="size === 'large'"
        [class.modal--small]="size === 'small'"
        (click)="$event.stopPropagation()"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="titleId"
      >
        <!-- Portal Effect -->
        <div class="modal__portal modal__portal--top-left"></div>
        <div class="modal__portal modal__portal--bottom-right"></div>
        
        <!-- Close Button -->
        <button 
          class="modal__close"
          (click)="close()"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <!-- Header -->
        <div class="modal__header" *ngIf="title">
          <h2 class="modal__title" [id]="titleId">{{ title }}</h2>
          <p class="modal__subtitle" *ngIf="subtitle">{{ subtitle }}</p>
        </div>
        
        <!-- Body -->
        <div class="modal__body">
          <ng-content></ng-content>
        </div>
        
        <!-- Footer -->
        <div class="modal__footer" *ngIf="showFooter">
          <ng-content select="[footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./modal.component.scss'],
  animations: []
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() subtitle = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() showFooter = false;
  @Input() closeOnBackdrop = true;
  @Input() closeOnEscape = true;
  
  @Output() modalClose = new EventEmitter<void>();
  
  titleId = `modal-title-${Math.random().toString(36).substr(2, 9)}`;
  
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event): void {
    if (this.isOpen && this.closeOnEscape) {
      this.close();
    }
  }
  
  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdrop) {
      this.close();
    }
  }
  
  close(): void {
    this.modalClose.emit();
  }
}

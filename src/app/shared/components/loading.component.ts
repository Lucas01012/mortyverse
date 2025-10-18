import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading" [class.loading--fullscreen]="fullscreen">
      <div class="loading__portal">
        <div class="loading__portal-ring loading__portal-ring--1"></div>
        <div class="loading__portal-ring loading__portal-ring--2"></div>
        <div class="loading__portal-ring loading__portal-ring--3"></div>
        <div class="loading__portal-center">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a10 10 0 0 1 0 20"></path>
          </svg>
        </div>
      </div>
      
      <p class="loading__text" *ngIf="text">{{ text }}</p>
      
      <div class="loading__dots" *ngIf="showDots">
        <span class="loading__dot"></span>
        <span class="loading__dot"></span>
        <span class="loading__dot"></span>
      </div>
    </div>
  `,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() text = 'Loading from the multiverse...';
  @Input() fullscreen = false;
  @Input() showDots = true;
}

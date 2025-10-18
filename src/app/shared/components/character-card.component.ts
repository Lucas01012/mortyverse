import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="character-card" [class.character-card--featured]="featured">
      <div class="character-card__image-wrapper">
        <img 
          [src]="image" 
          [alt]="name"
          class="character-card__image"
          loading="lazy"
        />
        <div class="character-card__overlay">
          <button class="character-card__action-btn" aria-label="View details">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="character-card__body">
        <h3 class="character-card__name">{{ name }}</h3>
        
        <div class="character-card__info">
          <div class="character-card__status">
            <span 
              class="status-indicator" 
              [class.status-indicator--alive]="status === 'Alive'"
              [class.status-indicator--dead]="status === 'Dead'"
              [class.status-indicator--unknown]="status === 'unknown'"
            ></span>
            <span class="character-card__status-text">{{ status }}</span>
          </div>
          
          <div class="character-card__species" *ngIf="species">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
            </svg>
            <span>{{ species }}</span>
          </div>
        </div>
        
        <div class="character-card__meta" *ngIf="location">
          <p class="character-card__location">
            <span class="character-card__label">Last location:</span>
            <span class="character-card__value">{{ location }}</span>
          </p>
        </div>
      </div>
      
      <div class="character-card__portal" *ngIf="featured"></div>
    </article>
  `,
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent {
  @Input() image = '';
  @Input() name = '';
  @Input() status: 'Alive' | 'Dead' | 'unknown' = 'unknown';
  @Input() species = '';
  @Input() location = '';
  @Input() featured = false;
}

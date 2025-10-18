import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-list-card',
	standalone: true,
	imports: [CommonModule],
	template: `
		<article class="list-card" [class.list-card--empty]="characterCount === 0">
			<div class="list-card__header">
				<div class="list-card__icon">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
					</svg>
				</div>
        
				<div class="list-card__title-wrapper">
					<h3 class="list-card__title">{{ name }}</h3>
					<p class="list-card__count">
						{{ characterCount }} {{ characterCount === 1 ? 'character' : 'characters' }}
					</p>
				</div>
        
				<div class="list-card__actions">
					<button class="list-card__action-btn" aria-label="Edit list">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
							<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
						</svg>
					</button>
          
					<button class="list-card__action-btn list-card__action-btn--delete" aria-label="Delete list">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="3 6 5 6 21 6"></polyline>
							<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
						</svg>
					</button>
				</div>
			</div>
      
			<div class="list-card__body" *ngIf="characterCount > 0">
				<div class="list-card__preview">
					<div 
						class="list-card__preview-item" 
						*ngFor="let character of previewCharacters; let i = index"
						[style.z-index]="previewCharacters.length - i"
					>
						<img 
							[src]="character.image" 
							[alt]="character.name"
							class="list-card__preview-image"
							loading="lazy"
						/>
					</div>
          
					<div class="list-card__preview-more" *ngIf="characterCount > 3">
						+{{ characterCount - 3 }}
					</div>
				</div>
        
				<button class="list-card__view-btn">
					<span>View List</span>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</button>
			</div>
      
			<div class="list-card__empty" *ngIf="characterCount === 0">
				<div class="list-card__empty-icon">
					<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<circle cx="12" cy="12" r="10"></circle>
						<line x1="12" y1="8" x2="12" y2="12"></line>
						<line x1="12" y1="16" x2="12.01" y2="16"></line>
					</svg>
				</div>
				<p class="list-card__empty-text">No characters yet</p>
				<button class="list-card__add-btn">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<line x1="12" y1="5" x2="12" y2="19"></line>
						<line x1="5" y1="12" x2="19" y2="12"></line>
					</svg>
					<span>Add Characters</span>
				</button>
			</div>
      
			<div class="list-card__portal"></div>
		</article>
	`,
		styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent {
	@Input() name = '';
	@Input() characterCount = 0;
	@Input() previewCharacters: Array<{ name: string; image: string }> = [];
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterCardComponent } from '../../../shared/components/character-card.component';
import { PaginationComponent } from '../../../shared/components/pagination.component';
import { ModalComponent } from '../../../shared/components/modal.component';

@Component({
  selector: 'app-character-list-page',
  imports: [
    CommonModule,
    FormsModule,
    CharacterCardComponent,
    PaginationComponent,
    ModalComponent
  ],
  template: `
    <div class="character-list-page">
      <!-- Header -->
      <header class="page-header">
        <div class="container">
          <h1 class="page-title">Character Explorer</h1>
          <p class="page-subtitle">Explore the multiverse of Rick and Morty characters</p>
          
          <!-- Search & Filters -->
          <div class="page-controls">
            <div class="search-box">
              <svg class="search-box__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input 
                type="text" 
                class="search-box__input" 
                placeholder="Search characters..."
                [(ngModel)]="searchTerm"
              />
            </div>
            
            <div class="filter-group">
              <button class="filter-btn" [class.filter-btn--active]="filterStatus === 'all'">
                All
              </button>
              <button class="filter-btn" [class.filter-btn--active]="filterStatus === 'alive'">
                Alive
              </button>
              <button class="filter-btn" [class.filter-btn--active]="filterStatus === 'dead'">
                Dead
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <!-- Characters Grid -->
      <main class="page-content">
        <div class="container">
          <!-- Loading State -->
          <div class="loading-state" *ngIf="isLoading">
            <div class="spinner"></div>
            <p>Loading characters from the multiverse...</p>
          </div>
          
          <!-- Characters Grid -->
          <div class="grid cols-4" *ngIf="!isLoading && characters.length > 0">
            <app-character-card
              *ngFor="let character of characters"
              [image]="character.image"
              [name]="character.name"
              [status]="character.status"
              [species]="character.species"
              [location]="character.location"
              (click)="openModal(character)"
            />
          </div>
          
          <!-- Empty State -->
          <div class="empty-state" *ngIf="!isLoading && characters.length === 0">
            <div class="empty-state__icon">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h2 class="empty-state__title">No characters found</h2>
            <p class="empty-state__text">Try adjusting your filters or search term</p>
          </div>
          
          <!-- Pagination -->
          <app-pagination
            *ngIf="!isLoading && characters.length > 0"
            [currentPage]="currentPage"
            [totalPages]="totalPages"
            (pageChange)="onPageChange($event)"
          />
        </div>
      </main>
      
      <!-- Character Details Modal -->
      <app-modal
        [isOpen]="isModalOpen"
        [title]="selectedCharacter?.name || ''"
        [subtitle]="selectedCharacter?.species || ''"
        (modalClose)="closeModal()"
      >
        <div class="character-details" *ngIf="selectedCharacter">
          <div class="character-details__hero">
            <img 
              [src]="selectedCharacter.image" 
              [alt]="selectedCharacter.name"
              class="character-details__image"
            />
            
            <div class="character-details__info">
              <div class="character-details__row">
                <span class="character-details__label">Status</span>
                <span class="character-details__value">
                  <span 
                    class="badge"
                    [class.badge-alive]="selectedCharacter.status === 'Alive'"
                    [class.badge-dead]="selectedCharacter.status === 'Dead'"
                    [class.badge-unknown]="selectedCharacter.status === 'unknown'"
                  >
                    {{ selectedCharacter.status }}
                  </span>
                </span>
              </div>
              
              <div class="character-details__row">
                <span class="character-details__label">Species</span>
                <span class="character-details__value">{{ selectedCharacter.species }}</span>
              </div>
              
              <div class="character-details__row">
                <span class="character-details__label">Gender</span>
                <span class="character-details__value">{{ selectedCharacter.gender }}</span>
              </div>
              
              <div class="character-details__row">
                <span class="character-details__label">Origin</span>
                <span class="character-details__value">{{ selectedCharacter.origin }}</span>
              </div>
            </div>
          </div>
          
          <div class="character-details__row">
            <span class="character-details__label">Current Location</span>
            <span class="character-details__value">{{ selectedCharacter.location }}</span>
          </div>
        </div>
        
        <div footer>
          <button class="btn btn-outline" (click)="closeModal()">Close</button>
          <button class="btn btn-primary">Add to List</button>
        </div>
      </app-modal>
    </div>
  `,
  styleUrls: ['./character-list-page.component.scss']
})
export class CharacterListPageComponent {
  isLoading = false;
  searchTerm = '';
  filterStatus = 'all';
  currentPage = 1;
  totalPages = 10;
  
  isModalOpen = false;
  selectedCharacter: any = null;
  
  // Mock data for demonstration
  characters = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive' as const,
      species: 'Human',
      gender: 'Male',
      origin: 'Earth (C-137)',
      location: 'Earth (Replacement Dimension)',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
    },
    // Add more mock characters as needed
  ];
  
  openModal(character: any): void {
    this.selectedCharacter = character;
    this.isModalOpen = true;
  }
  
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedCharacter = null;
  }
  
  onPageChange(page: number): void {
    this.currentPage = page;
    // Load new page data
  }
}

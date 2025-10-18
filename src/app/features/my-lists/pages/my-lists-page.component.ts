import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCardComponent } from '../components/list-card.component';

@Component({
  selector: 'app-my-lists-page',
  imports: [CommonModule, ListCardComponent],
  template: `
    <div class="my-lists-page">
      <header class="page-header">
        <div class="container">
          <div class="page-header__content">
            <div class="page-header__text">
              <h1 class="page-title">My Lists</h1>
              <p class="page-subtitle">Organize your favorite characters</p>
            </div>
            
            <button class="btn btn-primary btn-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Create New List</span>
            </button>
          </div>
        </div>
      </header>
      
      <main class="page-content">
        <div class="container">
          <!-- Stats Cards -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-card__icon stat-card__icon--primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div class="stat-card__content">
                <h3 class="stat-card__value">{{ totalLists }}</h3>
                <p class="stat-card__label">Total Lists</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-card__icon stat-card__icon--secondary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div class="stat-card__content">
                <h3 class="stat-card__value">{{ totalCharacters }}</h3>
                <p class="stat-card__label">Characters Saved</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-card__icon stat-card__icon--purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <div class="stat-card__content">
                <h3 class="stat-card__value">{{ favoritesCount }}</h3>
                <p class="stat-card__label">Favorites</p>
              </div>
            </div>
          </div>
          
          <!-- Lists Grid -->
          <div class="lists-section">
            <h2 class="section-title">Your Collections</h2>
            
            <div class="grid cols-3" *ngIf="lists.length > 0">
              <app-list-card
                *ngFor="let list of lists"
                [name]="list.name"
                [characterCount]="list.characterCount"
                [previewCharacters]="list.previewCharacters"
              />
            </div>
            
            <!-- Empty State -->
            <div class="empty-state" *ngIf="lists.length === 0">
              <div class="empty-state__portal">
                <div class="empty-state__portal-ring"></div>
                <div class="empty-state__portal-ring"></div>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h2 class="empty-state__title">No lists yet</h2>
              <p class="empty-state__text">
                Create your first list to start organizing your favorite characters
              </p>
              <button class="btn btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Create Your First List</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styleUrls: ['./my-lists-page.component.scss']
})
export class MyListsPageComponent {
  totalLists = 3;
  totalCharacters = 42;
  favoritesCount = 15;
  
  lists = [
    {
      name: 'Favorites',
      characterCount: 5,
      previewCharacters: [
        { name: 'Rick Sanchez', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
        { name: 'Morty Smith', image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg' },
        { name: 'Summer Smith', image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg' }
      ]
    },
    {
      name: 'Rick Variants',
      characterCount: 8,
      previewCharacters: [
        { name: 'Rick', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
        { name: 'Rick', image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg' },
        { name: 'Rick', image: 'https://rickandmortyapi.com/api/character/avatar/22.jpeg' }
      ]
    },
    {
      name: 'Empty List',
      characterCount: 0,
      previewCharacters: []
    }
  ];
}

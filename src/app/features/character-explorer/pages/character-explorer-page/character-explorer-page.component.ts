import { Component, computed, signal, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Character } from '../../../../core/models/character.model';
import { ApiService } from '../../../../core/services/api.service';
import { SearchBar } from '../../components/search-bar/search-bar.component';
import { CharacterList } from '../../components/character-list/character-list.component';
import { Pagination } from '../../../../shared/components/pagination/pagination';
import { Modal } from '../../../../shared/components/modal/modal';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { AddToListModal } from '../../../../shared/components/add-to-list-modal/add-to-list-modal';

@Component({
  selector: 'app-character-explorer-page',
  imports: [SearchBar, CharacterList, Pagination, Modal, TruncatePipe, AddToListModal],
  templateUrl: './character-explorer-page.component.html',
  styleUrl: './character-explorer-page.component.scss'
})
export class CharacterExplorerPage implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  protected isLoading = signal(false);
  protected searchTerm = signal('');
  protected statusFilter = signal('');
  protected genderFilter = signal('');
  protected currentPage = signal(1);
  protected itemsPerPage = 9;
  
  protected isModalOpen = signal(false);
  protected selectedCharacter = signal<Character | null>(null);
  
  protected isAddToListModalOpen = signal(false);
  protected characterToAdd = signal<Character | null>(null);

  protected allCharacters = signal<Character[]>([]);
  protected totalPages = signal(1);

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  protected loadCharacters(): void {
    this.isLoading.set(true);
    
    this.apiService.getCharacters({
      page: this.currentPage(),
      name: this.searchTerm() || undefined,
      status: this.statusFilter() || undefined,
      gender: this.genderFilter() || undefined
    }).subscribe({
      next: (response) => {
        this.allCharacters.set(response.results);
        this.totalPages.set(response.info.pages);
        this.isLoading.set(false);
        
        // Scroll para o topo DEPOIS da renderização (só no browser)
        if (this.isBrowser) {
          // Duplo requestAnimationFrame garante que o DOM foi completamente renderizado
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              document.documentElement.scrollTop = 0;
            });
          });
        }
      },
      error: (error) => {
        console.error('Erro ao carregar personagens:', error);
        this.allCharacters.set([]);
        this.totalPages.set(1);
        this.isLoading.set(false);
      }
    });
  }

  protected paginatedCharacters = computed(() => this.allCharacters());

  protected onSearchChange(term: string): void {
    this.searchTerm.set(term);
    this.currentPage.set(1);
    this.loadCharacters();
  }

  protected onStatusChange(status: string): void {
    this.statusFilter.set(status);
    this.currentPage.set(1);
    this.loadCharacters();
  }

  protected onGenderChange(gender: string): void {
    this.genderFilter.set(gender);
    this.currentPage.set(1);
    this.loadCharacters();
  }

  protected onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadCharacters();
  }

  protected onViewDetails(character: Character): void {
    this.selectedCharacter.set(character);
    this.isModalOpen.set(true);
  }

  protected onAddToList(character: Character): void {
    this.characterToAdd.set(character);
    this.isAddToListModalOpen.set(true);
  }

  protected onCloseAddToListModal(): void {
    this.isAddToListModalOpen.set(false);
    setTimeout(() => {
      this.characterToAdd.set(null);
    }, 300);
  }

  protected onCharacterAdded(): void {
    console.log('Personagem adicionado à lista com sucesso!');
  }

  protected onCloseModal(): void {
    this.isModalOpen.set(false);
    setTimeout(() => {
      this.selectedCharacter.set(null);
    }, 300);
  }
}

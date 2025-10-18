import { Component, OnInit, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListsState } from '../../../core/state/lists.state';
import { CustomList } from '../../../core/models/custom-list.model';
import { Character } from '../../../core/models/character.model';
import { ApiService } from '../../../core/services/api.service';
import { AddListForm } from '../components/add-list-form/add-list-form';
import { Modal } from '../../../shared/components/modal/modal';
import { CharacterCard } from '../../character-explorer/components/character-card/character-card.component';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-list-detail-page',
  imports: [RouterLink, AddListForm, Modal, CharacterCard, FormsModule, TruncatePipe],
  templateUrl: './list-detail-page.component.html',
  styleUrl: './list-detail-page.component.scss'
})
export class ListDetailPage implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private listsState = inject(ListsState);
  private apiService = inject(ApiService);

  protected list = signal<CustomList | null>(null);
  protected isEditingList = signal(false);
  protected isSearchModalOpen = signal(false);
  protected searchResults = signal<Character[]>([]);
  protected searchTerm = signal('');
  protected isSearching = signal(false);
  protected characterToRemove = signal<Character | null>(null);
  protected isRemoveModalOpen = signal(false);
  protected isDetailModalOpen = signal(false);
  protected selectedCharacter = signal<Character | null>(null);

  protected hasCharacters = computed(() => {
    const currentList = this.list();
    return currentList ? currentList.characters.length > 0 : false;
  });

  ngOnInit(): void {
    const listId = this.route.snapshot.paramMap.get('id');
    if (listId) {
      this.loadList(listId);
    } else {
      this.router.navigate(['/my-lists']);
    }
  }

  private loadList(id: string): void {
    const foundList = this.listsState.getListById(id);
    if (foundList) {
      this.list.set(foundList);
    } else {
      this.router.navigate(['/my-lists']);
    }
  }

  protected onEditList(): void {
    this.isEditingList.set(true);
  }

  protected onUpdateList(dto: { name: string; description?: string }): void {
    const currentList = this.list();
    if (currentList) {
      this.listsState.updateList(currentList.id, dto);
      this.loadList(currentList.id);
      this.isEditingList.set(false);
    }
  }

  protected onCancelEdit(): void {
    this.isEditingList.set(false);
  }

  protected onDeleteList(): void {
    const currentList = this.list();
    if (currentList && confirm(`Tem certeza que deseja excluir a lista "${currentList.name}"?`)) {
      this.listsState.deleteList(currentList.id);
      this.router.navigate(['/my-lists']);
    }
  }

  protected onOpenSearchModal(): void {
    this.isSearchModalOpen.set(true);
    this.searchCharacters();
  }

  protected onCloseSearchModal(): void {
    this.isSearchModalOpen.set(false);
    this.searchTerm.set('');
    this.searchResults.set([]);
  }

  protected onSearchChange(term: string): void {
    this.searchTerm.set(term);
    if (term.length >= 2) {
      this.searchCharacters();
    } else {
      this.searchResults.set([]);
    }
  }

  private searchCharacters(): void {
    this.isSearching.set(true);
    this.apiService.getCharacters({
      page: 1,
      name: this.searchTerm() || undefined
    }).subscribe({
      next: (response) => {
        this.searchResults.set(response.results);
        this.isSearching.set(false);
      },
      error: () => {
        this.searchResults.set([]);
        this.isSearching.set(false);
      }
    });
  }

  protected onAddCharacter(character: Character): void {
    const currentList = this.list();
    if (currentList) {
      const success = this.listsState.addCharacterToList(currentList.id, character);
      if (success) {
        this.loadList(currentList.id);
        this.onCloseSearchModal();
      }
    }
  }

  protected onConfirmRemove(character: Character): void {
    this.characterToRemove.set(character);
    this.isRemoveModalOpen.set(true);
  }

  protected onRemoveCharacter(): void {
    const currentList = this.list();
    const character = this.characterToRemove();
    
    if (currentList && character) {
      this.listsState.removeCharacterFromList(currentList.id, character.id);
      this.loadList(currentList.id);
    }
    
    this.isRemoveModalOpen.set(false);
    this.characterToRemove.set(null);
  }

  protected onCancelRemove(): void {
    this.isRemoveModalOpen.set(false);
    this.characterToRemove.set(null);
  }

  protected isCharacterInList(character: Character): boolean {
    const currentList = this.list();
    return currentList ? currentList.characters.some(c => c.id === character.id) : false;
  }

  protected onViewDetails(character: Character): void {
    this.selectedCharacter.set(character);
    this.isDetailModalOpen.set(true);
  }

  protected onCloseDetailModal(): void {
    this.isDetailModalOpen.set(false);
    setTimeout(() => {
      this.selectedCharacter.set(null);
    }, 300);
  }
}

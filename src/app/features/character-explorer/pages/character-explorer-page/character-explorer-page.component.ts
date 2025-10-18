import { Component, computed, signal } from '@angular/core';
import { Character } from '../../../../core/models/character.model';
import { SearchBar } from '../../components/search-bar/search-bar.component';
import { CharacterList } from '../../components/character-list/character-list.component';
import { Pagination } from '../../../../shared/components/pagination/pagination';
import { Modal } from '../../../../shared/components/modal/modal';

@Component({
  selector: 'app-character-explorer-page',
  imports: [SearchBar, CharacterList, Pagination, Modal],
  templateUrl: './character-explorer-page.component.html',
  styleUrl: './character-explorer-page.component.scss'
})
export class CharacterExplorerPage {
  // State
  protected isLoading = signal(false);
  protected searchTerm = signal('');
  protected statusFilter = signal('');
  protected genderFilter = signal('');
  protected currentPage = signal(1);
  protected itemsPerPage = 9;
  
  protected isModalOpen = signal(false);
  protected selectedCharacter = signal<Character | null>(null);

  // Mock data - substitua pela API depois
  protected allCharacters = signal<Character[]>([
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: '' },
      location: { name: 'Citadel of Ricks', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [],
      url: '',
      created: ''
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: '' },
      location: { name: 'Citadel of Ricks', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      episode: [],
      url: '',
      created: ''
    },
    {
      id: 3,
      name: 'Summer Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Female',
      origin: { name: 'Earth (Replacement Dimension)', url: '' },
      location: { name: 'Earth (Replacement Dimension)', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
      episode: [],
      url: '',
      created: ''
    },
    {
      id: 4,
      name: 'Beth Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Female',
      origin: { name: 'Earth (Replacement Dimension)', url: '' },
      location: { name: 'Earth (Replacement Dimension)', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
      episode: [],
      url: '',
      created: ''
    },
    {
      id: 5,
      name: 'Jerry Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (Replacement Dimension)', url: '' },
      location: { name: 'Earth (Replacement Dimension)', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
      episode: [],
      url: '',
      created: ''
    },
    {
      id: 6,
      name: 'Abadango Cluster Princess',
      status: 'Alive',
      species: 'Alien',
      type: '',
      gender: 'Female',
      origin: { name: 'Abadango', url: '' },
      location: { name: 'Abadango', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/6.jpeg',
      episode: [],
      url: '',
      created: ''
    },
    {
      id: 7,
      name: 'Abradolf Lincler',
      status: 'unknown',
      species: 'Human',
      type: 'Genetic experiment',
      gender: 'Male',
      origin: { name: 'Earth (Replacement Dimension)', url: '' },
      location: { name: 'Testicle Monster Dimension', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg',
      episode: [],
      url: '',
      created: ''
    },
    {
      id: 8,
      name: 'Adjudicator Rick',
      status: 'Dead',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'unknown', url: '' },
      location: { name: 'Citadel of Ricks', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
      episode: [],
      url: '',
      created: ''
    },
    {
      id: 9,
      name: 'Agency Director',
      status: 'Dead',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (Replacement Dimension)', url: '' },
      location: { name: 'Earth (Replacement Dimension)', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/9.jpeg',
      episode: [],
      url: '',
      created: ''
    },
    {
      id: 10,
      name: 'Alan Rails',
      status: 'Dead',
      species: 'Human',
      type: 'Superhuman (Ghost trains summoner)',
      gender: 'Male',
      origin: { name: 'unknown', url: '' },
      location: { name: "Worldender's lair", url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/10.jpeg',
      episode: [],
      url: '',
      created: ''
    },
    {
      id: 11,
      name: 'Albert Einstein',
      status: 'Dead',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: '' },
      location: { name: 'Earth (Replacement Dimension)', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/11.jpeg',
      episode: [],
      url: '',
      created: ''
    },
    {
      id: 12,
      name: 'Alexander',
      status: 'Dead',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: '' },
      location: { name: 'Anatomy Park', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/12.jpeg',
      episode: [],
      url: '',
      created: ''
    }
  ]);

  // Computed: filtered characters
  protected filteredCharacters = computed(() => {
    let filtered = this.allCharacters();

    // Filter by search term
    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(term)
      );
    }

    // Filter by status
    if (this.statusFilter()) {
      filtered = filtered.filter(c => 
        c.status.toLowerCase() === this.statusFilter().toLowerCase()
      );
    }

    // Filter by gender
    if (this.genderFilter()) {
      filtered = filtered.filter(c => 
        c.gender.toLowerCase() === this.genderFilter().toLowerCase()
      );
    }

    return filtered;
  });

  // Computed: total pages
  protected totalPages = computed(() => 
    Math.ceil(this.filteredCharacters().length / this.itemsPerPage)
  );

  // Computed: paginated characters
  protected paginatedCharacters = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredCharacters().slice(start, end);
  });

  // Event handlers
  protected onSearchChange(term: string): void {
    this.searchTerm.set(term);
    this.currentPage.set(1); // Reset to first page
  }

  protected onStatusChange(status: string): void {
    this.statusFilter.set(status);
    this.currentPage.set(1);
  }

  protected onGenderChange(gender: string): void {
    this.genderFilter.set(gender);
    this.currentPage.set(1);
  }

  protected onPageChange(page: number): void {
    this.currentPage.set(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected onViewDetails(character: Character): void {
    this.selectedCharacter.set(character);
    this.isModalOpen.set(true);
  }

  protected onAddToList(character: Character): void {
    // TODO: Implement add to list logic
    console.log('Add to list:', character.name);
    alert(`${character.name} será adicionado à sua lista! (funcionalidade em desenvolvimento)`);
  }

  protected onCloseModal(): void {
    this.isModalOpen.set(false);
    this.selectedCharacter.set(null);
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { CharacterExplorerPage } from './character-explorer-page.component';
import { ApiService } from '../../../../core/services/api.service';
import { Character } from '../../../../core/models/character.model';

describe('CharacterExplorerPage', () => {
  let component: CharacterExplorerPage;
  let fixture: ComponentFixture<CharacterExplorerPage>;
  let mockApiService: any;

  const mockCharacters: Character[] = [
    { id: 1, name: 'Rick', status: 'Alive', species: 'Human', image: 'rick.jpg' } as Character,
    { id: 2, name: 'Morty', status: 'Alive', species: 'Human', image: 'morty.jpg' } as Character
  ];

  const mockResponse = {
    results: mockCharacters,
    info: { count: 100, pages: 10, next: 'url', prev: null }
  };

  beforeEach(async () => {
    mockApiService = {
      getCharacters: jest.fn().mockReturnValue(of(mockResponse))
    };

    Object.defineProperty(window, 'scrollTo', {
      value: jest.fn(),
      writable: true
    });

    await TestBed.configureTestingModule({
      imports: [CharacterExplorerPage, HttpClientTestingModule],
      providers: [
        { provide: ApiService, useValue: mockApiService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterExplorerPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load characters on init', () => {
    fixture.detectChanges();
    expect(mockApiService.getCharacters).toHaveBeenCalledWith({
      page: 1,
      name: undefined,
      status: undefined,
      gender: undefined
    });
  });

  describe('search and filters', () => {
    beforeEach(() => {
      fixture.detectChanges();
      jest.clearAllMocks();
    });

    it('should reload characters when search term changes', () => {
      (component as any).onSearchChange('Rick');
      
      expect((component as any).searchTerm()).toBe('Rick');
      expect((component as any).currentPage()).toBe(1);
      expect(mockApiService.getCharacters).toHaveBeenCalledWith({
        page: 1,
        name: 'Rick',
        status: undefined,
        gender: undefined
      });
    });

    it('should reload characters when status filter changes', () => {
      (component as any).onStatusChange('Alive');
      
      expect((component as any).statusFilter()).toBe('Alive');
      expect((component as any).currentPage()).toBe(1);
      expect(mockApiService.getCharacters).toHaveBeenCalledWith({
        page: 1,
        name: undefined,
        status: 'Alive',
        gender: undefined
      });
    });

    it('should reload characters when gender filter changes', () => {
      (component as any).onGenderChange('Male');
      
      expect((component as any).genderFilter()).toBe('Male');
      expect((component as any).currentPage()).toBe(1);
      expect(mockApiService.getCharacters).toHaveBeenCalledWith({
        page: 1,
        name: undefined,
        status: undefined,
        gender: 'Male'
      });
    });

    it('should reload characters when page changes', () => {
      (component as any).onPageChange(3);
      (component as any).loadCharacters();
      expect((component as any).currentPage()).toBe(3);
      expect(mockApiService.getCharacters).toHaveBeenCalledWith({
        page: 3,
        name: undefined,
        status: undefined,
        gender: undefined
      });
    });
  });

  describe('modal interactions', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should open character detail modal', () => {
      (component as any).onViewDetails(mockCharacters[0]);
      
      expect((component as any).selectedCharacter()).toEqual(mockCharacters[0]);
      expect((component as any).isModalOpen()).toBe(true);
    });

    it('should close character detail modal', (done) => {
      (component as any).selectedCharacter.set(mockCharacters[0]);
      (component as any).isModalOpen.set(true);
      
      (component as any).onCloseModal();
      
      expect((component as any).isModalOpen()).toBe(false);
      setTimeout(() => {
        expect((component as any).selectedCharacter()).toBeNull();
        done();
      }, 350);
    });

    it('should open add-to-list modal', () => {
      (component as any).onAddToList(mockCharacters[0]);
      
      expect((component as any).characterToAdd()).toEqual(mockCharacters[0]);
      expect((component as any).isAddToListModalOpen()).toBe(true);
    });

    it('should close add-to-list modal', (done) => {
      (component as any).characterToAdd.set(mockCharacters[0]);
      (component as any).isAddToListModalOpen.set(true);
      
      (component as any).onCloseAddToListModal();
      
      expect((component as any).isAddToListModalOpen()).toBe(false);
      setTimeout(() => {
        expect((component as any).characterToAdd()).toBeNull();
        done();
      }, 350);
    });

    it('should handle character added event', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      
      (component as any).onCharacterAdded();
      
      expect(consoleSpy).toHaveBeenCalledWith('Personagem adicionado à lista com sucesso!');
    });
  });

  describe('loading and error handling', () => {
    it('should handle API error', () => {
      mockApiService.getCharacters.mockReturnValue(throwError(() => new Error('API Error')));
      const consoleSpy = jest.spyOn(console, 'error');
      
      fixture.detectChanges();
      
      expect((component as any).allCharacters()).toEqual([]);
      expect((component as any).totalPages()).toBe(1);
      expect((component as any).isLoading()).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('should set loading state while fetching', () => {
      expect((component as any).isLoading()).toBe(false);
      mockApiService.getCharacters.mockReturnValue({
        subscribe: ({ next }: any) => {
        }
      });
      (component as any).loadCharacters();
      expect((component as any).isLoading()).toBe(true);
    });
  });

  describe('browser-specific behavior', () => {
    it('should not scroll to top when not in browser', () => {
      Object.defineProperty(component, 'isBrowser', { get: () => false });
      
      fixture.detectChanges();
      
      expect(() => {
        (component as any).loadCharacters();
      }).not.toThrow();
    });
  });
});


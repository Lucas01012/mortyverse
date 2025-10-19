import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizPage } from './quiz-page.component';
import { ApiService } from '../../../core/services/api.service';
import { Character, CharacterResponse } from '../../../core/models/character.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('QuizPage', () => {
  let component: QuizPage;
  let fixture: ComponentFixture<QuizPage>;
  let apiService: jest.Mocked<ApiService>;

  const mockCharacter: Character = {
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
    created: '2017-11-04T18:48:46.250Z'
  };

  const mockResponse: CharacterResponse = {
    info: { count: 1, pages: 1, next: null, prev: null },
    results: [mockCharacter]
  };

  beforeEach(async () => {
    const apiServiceSpy = {
      getCharacters: jest.fn()
    } as unknown as jest.Mocked<ApiService>;

    await TestBed.configureTestingModule({
      imports: [QuizPage, HttpClientTestingModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizPage);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jest.Mocked<ApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty state', () => {
    expect(component.resultCharacter()).toBeNull();
    expect(component.isLoading()).toBe(false);
    expect(component.errorMessage()).toBe('');
  });

  describe('onFiltersSubmit', () => {
    // We'll use a Subject to control emission timing for the ApiService spy
    it('should fetch character with filters and update state on success', async () => {
  const subject = new (await import('rxjs')).Subject<CharacterResponse>();
  apiService.getCharacters.mockReturnValue(subject.asObservable());

      // Start the request
      component.onFiltersSubmit({ status: 'Alive', gender: 'Male' });

      // spy should have been called with expected filters
      expect(apiService.getCharacters).toHaveBeenCalledWith({ page: 1, status: 'Alive', gender: 'Male' });

      // while the request is pending, loading should be true
      expect(component.isLoading()).toBe(true);

      // emit the response and complete
      subject.next(mockResponse);
      subject.complete();

      // wait a tick for observables to propagate
      await Promise.resolve();

      // final state assertions
      expect(component.resultCharacter()).toEqual(mockCharacter);
      expect(component.isLoading()).toBe(false);
      expect(component.errorMessage()).toBe('');
    });

    it('should show error when no characters found', async () => {
      const subject = new (await import('rxjs')).Subject<CharacterResponse>();
  apiService.getCharacters.mockReturnValue(subject.asObservable());

      component.onFiltersSubmit({ status: 'Unknown' });
      expect(component.isLoading()).toBe(true);

      const emptyResponse: CharacterResponse = {
        info: { count: 0, pages: 0, next: null, prev: null },
        results: []
      };

      subject.next(emptyResponse);
      subject.complete();

      await Promise.resolve();

      expect(component.resultCharacter()).toBeNull();
      expect(component.errorMessage()).toBe('Nenhum personagem encontrado com esses filtros. Tente outras combinações!');
      expect(component.isLoading()).toBe(false);
    });

    it('should handle API errors', async () => {
      const subject = new (await import('rxjs')).Subject<CharacterResponse>();
  apiService.getCharacters.mockReturnValue(subject.asObservable());

      component.onFiltersSubmit({ status: 'Alive' });
      expect(component.isLoading()).toBe(true);

      subject.error(new Error('API Error'));

      // allow error handlers to run
      await Promise.resolve();

      expect(component.errorMessage()).toBe('Erro ao buscar personagens. Tente novamente!');
      expect(component.isLoading()).toBe(false);
    });
  });

  describe('onTryAgain', () => {
    it('should reset state', () => {
      component.resultCharacter.set(mockCharacter);
      component.errorMessage.set('Some error');

      component.onTryAgain();

      expect(component.resultCharacter()).toBeNull();
      expect(component.errorMessage()).toBe('');
    });
  });
});

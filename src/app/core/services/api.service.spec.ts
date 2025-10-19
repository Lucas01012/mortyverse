import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { CharacterResponse, CharacterFilters } from '../models/character.model';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [ApiService] });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('builds params for filters', () => {
    service.getCharacters({ page: 2, name: 'rick', status: 'alive' }).subscribe();
    const req = httpMock.expectOne(r => r.url.endsWith('/character'));
    expect(req.request.params.get('page')).toBe('2');
    expect(req.request.params.get('name')).toBe('rick');
    expect(req.request.params.get('status')).toBe('alive');
    req.flush({ info: {}, results: [] });
  });

  it('sends empty params when no filters', () => {
    service.getCharacters().subscribe();
    const req = httpMock.expectOne(r => r.url.endsWith('/character'));
    expect(req.request.params.keys().length).toBe(0);
    req.flush({ info: {}, results: [] });
  });
});

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://rickandmortyapi.com/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCharacters', () => {
    it('should fetch characters without filters', () => {
      const mockResponse: CharacterResponse = {
        info: {
          count: 826,
          pages: 42,
          next: 'https://rickandmortyapi.com/api/character?page=2',
          prev: null
        },
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
            location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            episode: ['https://rickandmortyapi.com/api/episode/1'],
            url: 'https://rickandmortyapi.com/api/character/1',
            created: '2017-11-04T18:48:46.250Z'
          }
        ]
      };

      service.getCharacters().subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(response.results.length).toBe(1);
        expect(response.results[0].name).toBe('Rick Sanchez');
      });

      const req = httpMock.expectOne(`${baseUrl}/character`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should fetch characters with page filter', () => {
      const filters: CharacterFilters = { page: 2 };
      const mockResponse: CharacterResponse = {
        info: { count: 826, pages: 42, next: null, prev: 'https://rickandmortyapi.com/api/character?page=1' },
        results: []
      };

      service.getCharacters(filters).subscribe();

      const req = httpMock.expectOne(`${baseUrl}/character?page=2`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should fetch characters with name filter', () => {
      const filters: CharacterFilters = { name: 'Rick' };

      service.getCharacters(filters).subscribe();

      const req = httpMock.expectOne(`${baseUrl}/character?name=Rick`);
      expect(req.request.method).toBe('GET');
      req.flush({ info: { count: 0, pages: 0, next: null, prev: null }, results: [] });
    });

    it('should fetch characters with multiple filters', () => {
      const filters: CharacterFilters = {
        page: 1,
        name: 'Morty',
        status: 'Alive',
        gender: 'Male',
        species: 'Human'
      };

      service.getCharacters(filters).subscribe();

      const req = httpMock.expectOne(
        `${baseUrl}/character?page=1&name=Morty&status=Alive&gender=Male&species=Human`
      );
      expect(req.request.method).toBe('GET');
      req.flush({ info: { count: 0, pages: 0, next: null, prev: null }, results: [] });
    });

    it('should handle HTTP errors', () => {
      service.getCharacters().subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(404);
        }
      });

      const req = httpMock.expectOne(`${baseUrl}/character`);
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });
});

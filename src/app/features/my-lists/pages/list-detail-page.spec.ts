import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { ListDetailPage } from './list-detail-page.component';
import { ListsState } from '../../../core/state/lists.state';

describe('ListDetailPage', () => {
  let component: ListDetailPage;
  let fixture: ComponentFixture<ListDetailPage>;
  let listsState: ListsState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDetailPage, RouterTestingModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jest.fn().mockReturnValue('test-id')
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDetailPage);
    component = fixture.componentInstance;
    listsState = TestBed.inject(ListsState);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial state', () => {
    expect(component['list']()).toBeNull();
    expect(component['isEditingList']()).toBe(false);
    expect(component['isSearchModalOpen']()).toBe(false);
  });

  it('should navigate to /my-lists when no listId in route', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = jest.spyOn(router as any, 'navigate');
    
    const route = TestBed.inject(ActivatedRoute);
    route.snapshot.paramMap.get = jest.fn().mockReturnValue(null);
    
    component.ngOnInit();
    
    expect(navigateSpy).toHaveBeenCalledWith(['/my-lists']);
  });

  it('should navigate to /my-lists when list not found', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = jest.spyOn(router as any, 'navigate');
    
    jest.spyOn(listsState, 'getListById').mockReturnValue(undefined);
    
    (component as any).loadList('non-existent-id');
    
    expect(navigateSpy).toHaveBeenCalledWith(['/my-lists']);
  });

  it('should toggle edit mode', () => {
    (component as any).onEditList();
    expect(component['isEditingList']()).toBe(true);
  });

  it('should cancel edit mode', () => {
    component['isEditingList'].set(true);
    (component as any).onCancelEdit();
    expect(component['isEditingList']()).toBe(false);
  });

  it('should open search modal', () => {
    (component as any).onOpenSearchModal();
    expect(component['isSearchModalOpen']()).toBe(true);
  });

  it('should close search modal and reset search', () => {
    component['isSearchModalOpen'].set(true);
    component['searchTerm'].set('test');
    component['searchResults'].set([{ id: 1 } as any]);

    (component as any).onCloseSearchModal();

    expect(component['isSearchModalOpen']()).toBe(false);
    expect(component['searchTerm']()).toBe('');
    expect(component['searchResults']()).toEqual([]);
  });

  it('should update search term', () => {
    (component as any).onSearchChange('rick');
    expect(component['searchTerm']()).toBe('rick');
  });

  it('should clear search results when term is too short', () => {
    component['searchResults'].set([{ id: 1 } as any]);
    (component as any).onSearchChange('r');
    expect(component['searchResults']()).toEqual([]);
  });

  it('should open detail modal', () => {
    const mockCharacter: any = { id: 1, name: 'Rick' };
    (component as any).onViewDetails(mockCharacter);
    
    expect(component['isDetailModalOpen']()).toBe(true);
    expect(component['selectedCharacter']()).toEqual(mockCharacter);
  });

  it('should close detail modal', fakeAsync(() => {
    component['isDetailModalOpen'].set(true);
    component['selectedCharacter'].set({ id: 1 } as any);

    (component as any).onCloseDetailModal();

    expect(component['isDetailModalOpen']()).toBe(false);
    
    tick(300);
    expect(component['selectedCharacter']()).toBeNull();
  }));

  it('should open remove confirmation modal', () => {
    const mockCharacter: any = { id: 1, name: 'Rick' };
    (component as any).onConfirmRemove(mockCharacter);
    
    expect(component['isRemoveModalOpen']()).toBe(true);
    expect(component['characterToRemove']()).toEqual(mockCharacter);
  });

  it('should cancel remove', () => {
    component['isRemoveModalOpen'].set(true);
    component['characterToRemove'].set({ id: 1 } as any);

    (component as any).onCancelRemove();

    expect(component['isRemoveModalOpen']()).toBe(false);
    expect(component['characterToRemove']()).toBeNull();
  });

  it('should compute hasCharacters correctly when list has characters', () => {
    component['list'].set({
      id: '1',
      name: 'Test List',
      description: 'Test',
      characters: [{ id: 1 } as any],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    expect(component['hasCharacters']()).toBe(true);
  });

  it('should compute hasCharacters correctly when list is empty', () => {
    component['list'].set({
      id: '1',
      name: 'Test List',
      description: 'Test',
      characters: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    expect(component['hasCharacters']()).toBe(false);
  });

  it('should compute hasCharacters correctly when list is null', () => {
    component['list'].set(null);
    expect(component['hasCharacters']()).toBe(false);
  });

  it('should check if character is in list', () => {
    const char1 = { id: 1, name: 'Rick' } as any;
    const char2 = { id: 2, name: 'Morty' } as any;
    
    component['list'].set({
      id: '1',
      name: 'Test List',
      characters: [char1],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    expect((component as any).isCharacterInList(char1)).toBe(true);
    expect((component as any).isCharacterInList(char2)).toBe(false);
  });

  it('should add character to list and close modal', () => {
    const mockCharacter = { id: 1, name: 'Rick' } as any;
    component['list'].set({
      id: '1',
      name: 'Test List',
      characters: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    jest.spyOn(listsState, 'addCharacterToList').mockReturnValue(true);
    jest.spyOn(component as any, 'loadList');
    jest.spyOn(component as any, 'onCloseSearchModal');

    (component as any).onAddCharacter(mockCharacter);

    expect(listsState.addCharacterToList).toHaveBeenCalledWith('1', mockCharacter);
    expect((component as any).loadList).toHaveBeenCalledWith('1');
    expect((component as any).onCloseSearchModal).toHaveBeenCalled();
  });

  it('should handle remove character flow', () => {
    const mockCharacter = { id: 1, name: 'Rick' } as any;
    component['list'].set({
      id: '1',
      name: 'Test List',
      characters: [mockCharacter],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    jest.spyOn(listsState, 'removeCharacterFromList');
    jest.spyOn(component as any, 'loadList');

    (component as any).onRemoveCharacter();
    
    component['characterToRemove'].set(mockCharacter);
    (component as any).onRemoveCharacter();

    expect(listsState.removeCharacterFromList).toHaveBeenCalledWith('1', 1);
    expect((component as any).loadList).toHaveBeenCalledWith('1');
    expect(component['isRemoveModalOpen']()).toBe(false);
    expect(component['characterToRemove']()).toBeNull();
  });

  it('should clear searchResults when search term is too short', () => {
    (component as any).searchResults.set([{ id: 1 }]);
    (component as any).onSearchChange('a');
    expect(component['searchResults']()).toEqual([]);
  });

  it('should not add character if list is null', () => {
    component['list'].set(null);
    const spy = jest.spyOn(component as any, 'onCloseSearchModal');
    (component as any).onAddCharacter({ id: 1 });
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not remove character if list or characterToRemove is null', () => {
    const mockCharacter = {
      id: 1,
      name: 'Rick',
      status: 'Alive' as 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male' as 'Male',
      origin: { name: '', url: '' },
      location: { name: '', url: '' },
      image: '',
      episode: [],
      url: '',
      created: ''
    };
    const mockList = {
      id: '1',
      name: 'Test',
      description: '',
      characters: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    component['list'].set(null);
    component['characterToRemove'].set(mockCharacter);
    (component as any).onRemoveCharacter();
    component['list'].set(mockList);
    component['characterToRemove'].set(null);
    (component as any).onRemoveCharacter();
  });

  it('should not update list when currentList is null', () => {
    component['list'].set(null);
    const updateSpy = jest.spyOn(listsState, 'updateList');
    
    (component as any).onUpdateList({ name: 'New Name' });
    
    expect(updateSpy).not.toHaveBeenCalled();
  });

  it('should not delete list when currentList is null', () => {
    component['list'].set(null);
    const deleteSpy = jest.spyOn(listsState, 'deleteList');
    
    (component as any).onDeleteList();
    
    expect(deleteSpy).not.toHaveBeenCalled();
  });

  it('should not add character when currentList is null', () => {
    component['list'].set(null);
    const addSpy = jest.spyOn(listsState, 'addCharacterToList');
    const mockCharacter: any = { id: 1, name: 'Rick' };
    
    (component as any).onAddCharacter(mockCharacter);
    
    expect(addSpy).not.toHaveBeenCalled();
  });
});


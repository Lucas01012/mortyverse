import { TestBed } from '@angular/core/testing';
import { AddToListModal } from './add-to-list-modal';
import { ListsState } from '../../../core/state/lists.state';
import { Character } from '../../../core/models/character.model';
import { CustomList } from '../../../core/models/custom-list.model';

describe('AddToListModal', () => {
  let component: AddToListModal;
  let mockListsState: any;

  const mockCharacter: Character = {
    id: 1,
    name: 'Rick',
    status: 'Alive',
    species: 'Human',
    image: 'rick.jpg'
  } as Character;

  const mockLists: CustomList[] = [
    {
      id: 'list-1',
      name: 'Favorites',
      description: 'My favorite characters',
      characters: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'list-2',
      name: 'Best Episodes',
      description: '',
      characters: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  beforeEach(async () => {
    mockListsState = {
      allLists: jest.fn(() => mockLists),
      addCharacterToList: jest.fn(),
      createList: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [AddToListModal],
      providers: [
        { provide: ListsState, useValue: mockListsState }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(AddToListModal);
    component = fixture.componentInstance;
    
    // Set required inputs
    fixture.componentRef.setInput('character', mockCharacter);
    fixture.componentRef.setInput('isOpen', true);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have lists from state', () => {
    expect((component as any).lists()).toEqual(mockLists);
  });

  it('should compute hasLists correctly', () => {
    expect((component as any).hasLists()).toBe(true);
  });

  describe('onSelectList', () => {
    it('should add character to selected list and emit added event', () => {
      mockListsState.addCharacterToList.mockReturnValue(true);
      const addedSpy = jest.fn();
      const closeSpy = jest.fn();
      (component as any).added.subscribe(addedSpy);
      (component as any).close.subscribe(closeSpy);
      
      (component as any).selectedListId.set('list-1');
      (component as any).onSelectList();
      
      expect(mockListsState.addCharacterToList).toHaveBeenCalledWith('list-1', mockCharacter);
      expect(addedSpy).toHaveBeenCalled();
      expect(closeSpy).toHaveBeenCalled();
    });

    it('should not add if no list selected', () => {
      (component as any).selectedListId.set('');
      (component as any).onSelectList();
      
      expect(mockListsState.addCharacterToList).not.toHaveBeenCalled();
    });

    it('should not emit added if add fails', () => {
      mockListsState.addCharacterToList.mockReturnValue(false);
      const addedSpy = jest.fn();
      (component as any).added.subscribe(addedSpy);
      
      (component as any).selectedListId.set('list-1');
      (component as any).onSelectList();
      
      expect(addedSpy).not.toHaveBeenCalled();
    });
  });

  describe('onCreateAndAdd', () => {
    it('should create new list and add character', () => {
      const newList: CustomList = {
        id: 'new-list',
        name: 'New List',
        description: 'New Description',
        characters: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockListsState.createList.mockReturnValue(newList);
      
      const addedSpy = jest.fn();
      const closeSpy = jest.fn();
      (component as any).added.subscribe(addedSpy);
      (component as any).close.subscribe(closeSpy);
      
      (component as any).newListName.set('New List');
      (component as any).newListDescription.set('New Description');
      (component as any).onCreateAndAdd();
      
      expect(mockListsState.createList).toHaveBeenCalledWith({
        name: 'New List',
        description: 'New Description'
      });
      expect(mockListsState.addCharacterToList).toHaveBeenCalledWith('new-list', mockCharacter);
      expect(addedSpy).toHaveBeenCalled();
      expect(closeSpy).toHaveBeenCalled();
    });

    it('should not create list if name is empty', () => {
      (component as any).newListName.set('   ');
      (component as any).onCreateAndAdd();
      
      expect(mockListsState.createList).not.toHaveBeenCalled();
    });

    it('should create list with undefined description if empty', () => {
      const newList: CustomList = {
        id: 'new-list',
        name: 'New List',
        description: '',
        characters: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockListsState.createList.mockReturnValue(newList);
      
      (component as any).newListName.set('New List');
      (component as any).newListDescription.set('   ');
      (component as any).onCreateAndAdd();
      
      expect(mockListsState.createList).toHaveBeenCalledWith({
        name: 'New List',
        description: undefined
      });
    });
  });

  describe('toggleNewListForm', () => {
    it('should toggle form visibility', () => {
      expect((component as any).showNewListForm()).toBe(false);
      
      (component as any).toggleNewListForm();
      expect((component as any).showNewListForm()).toBe(true);
      
      (component as any).toggleNewListForm();
      expect((component as any).showNewListForm()).toBe(false);
    });

    it('should reset form fields when toggling', () => {
      (component as any).newListName.set('Test');
      (component as any).newListDescription.set('Description');
      
      (component as any).toggleNewListForm();
      
      expect((component as any).newListName()).toBe('');
      expect((component as any).newListDescription()).toBe('');
    });
  });

  describe('closeModal', () => {
    it('should reset all form state and emit close', () => {
      const closeSpy = jest.fn();
      (component as any).close.subscribe(closeSpy);
      
      (component as any).showNewListForm.set(true);
      (component as any).selectedListId.set('list-1');
      (component as any).newListName.set('Test');
      (component as any).newListDescription.set('Desc');
      
      (component as any).closeModal();
      
      expect((component as any).showNewListForm()).toBe(false);
      expect((component as any).selectedListId()).toBe('');
      expect((component as any).newListName()).toBe('');
      expect((component as any).newListDescription()).toBe('');
      expect(closeSpy).toHaveBeenCalled();
    });
  });
});

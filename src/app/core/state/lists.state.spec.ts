import { TestBed } from '@angular/core/testing';
import { ListsState } from './lists.state';
import { StorageService } from '../services/storage.service';

describe('ListsState', () => {
  let state: ListsState;
  let storage: StorageService;

  const mockListDto = { name: 'L1', description: 'd' } as any;

  beforeEach(() => {
    const storageMock = {
      getItem: jest.fn().mockReturnValue(null),
      setItem: jest.fn()
    } as unknown as StorageService;

    TestBed.configureTestingModule({
      providers: [
        ListsState,
        { provide: StorageService, useValue: storageMock }
      ]
    });

    state = TestBed.inject(ListsState);
    storage = TestBed.inject(StorageService);
  });

  beforeAll(() => {
    // crypto.randomUUID may not be available in the test environment
    if (!(global as any).crypto) {
      (global as any).crypto = {};
    }
    (global as any).crypto.randomUUID = jest.fn(() => 'uuid-1');
  });

  it('creates a list and persists it', () => {
    const created = state.createList(mockListDto);
    expect(created.id).toBeDefined();
    expect(created.name).toBe('L1');
    expect(state.listCount()).toBe(1);
    expect(storage.setItem).toHaveBeenCalled();
  });

  it('updates a list and returns true/false accordingly', () => {
    const created = state.createList(mockListDto);
    const ok = state.updateList(created.id, { name: 'changed' } as any);
    expect(ok).toBe(true);
    const notOk = state.updateList('nope', { name: 'x' } as any);
    expect(notOk).toBe(false);
    const found = state.getListById(created.id);
    expect(found?.name).toBe('changed');
  });

  it('deletes lists and returns false when id not found', () => {
    const created = state.createList(mockListDto);
    const ok = state.deleteList(created.id);
    expect(ok).toBe(true);
    const notOk = state.deleteList('nope');
    expect(notOk).toBe(false);
  });

  it('adds and removes characters', () => {
    const created = state.createList(mockListDto);
    const char = { id: 123, name: 'Rick' } as any;
    const added = state.addCharacterToList(created.id, char);
    expect(added).toBe(true);
    // adding again should be a no-op
    const addedAgain = state.addCharacterToList(created.id, char);
    expect(addedAgain).toBe(true);
    const removed = state.removeCharacterFromList(created.id, 123);
    expect(removed).toBe(true);
  });
});

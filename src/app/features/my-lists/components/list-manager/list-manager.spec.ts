import { TestBed } from '@angular/core/testing';
import { ListManager } from './list-manager';
import { ListsState } from '../../../../core/state/lists.state';
import { Router } from '@angular/router';

describe('ListManager', () => {
  let comp: ListManager;
  let listsState: jest.Mocked<ListsState>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    listsState = {
      allLists: { get: () => [] } as any,
      listCount: undefined as any,
      createList: jest.fn(),
      updateList: jest.fn(),
      deleteList: jest.fn(),
      getListById: jest.fn(),
      addCharacterToList: jest.fn() as any,
      removeCharacterFromList: jest.fn() as any
    } as unknown as jest.Mocked<ListsState>;

    router = { navigate: jest.fn() } as unknown as jest.Mocked<Router>;

    TestBed.configureTestingModule({ providers: [ListManager, { provide: ListsState, useValue: listsState }, { provide: Router, useValue: router }] });
    comp = TestBed.inject(ListManager);
  });

  it('should show form and reset editing when onShowForm called', () => {
    (comp as any).onShowForm();
    expect((comp as any).showForm()).toBe(true);
    expect((comp as any).editingList()).toBeNull();
  });

  it('onCreateList should call listsState.createList and hide form', () => {
    (comp as any).onShowForm();
    (comp as any).onCreateList({ name: 'x' } as any);
    expect(listsState.createList).toHaveBeenCalled();
    expect((comp as any).showForm()).toBe(false);
  });

  it('onEditList sets editingList and shows form', () => {
    const list = { id: '1' } as any;
    (comp as any).onEditList(list);
    expect((comp as any).editingList()).toBe(list);
    expect((comp as any).showForm()).toBe(true);
  });

  it('onUpdateList updates and clears editingList when editing set', () => {
    const list = { id: '2' } as any;
    (comp as any).editingList.set(list);
    (comp as any).onUpdateList({ name: 'u' } as any);
    expect(listsState.updateList).toHaveBeenCalledWith('2', { name: 'u' });
    expect((comp as any).editingList()).toBeNull();
    expect((comp as any).showForm()).toBe(false);
  });

  it('onUpdateList does nothing when editingList is null', () => {
    (comp as any).editingList.set(null);
    (comp as any).onUpdateList({ name: 'u' } as any);
    expect(listsState.updateList).not.toHaveBeenCalled();
  });

  it('onDeleteList calls listsState.deleteList', () => {
    const list = { id: '3' } as any;
    (comp as any).onDeleteList(list);
    expect(listsState.deleteList).toHaveBeenCalledWith('3');
  });

  it('onCancelForm hides form and clears editing', () => {
    (comp as any).editingList.set({ id: '5' } as any);
    (comp as any).showForm.set(true);
    (comp as any).onCancelForm();
    expect((comp as any).showForm()).toBe(false);
    expect((comp as any).editingList()).toBeNull();
  });

  it('onViewList navigates to the list id', () => {
    const list = { id: '10' } as any;
    (comp as any).onViewList(list);
    expect(router.navigate).toHaveBeenCalledWith(['/my-lists', '10']);
  });
});

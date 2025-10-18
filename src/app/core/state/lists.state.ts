import { Injectable, signal, computed } from '@angular/core';
import { CustomList, CreateListDto, UpdateListDto } from '../models/custom-list.model';
import { Character } from '../models/character.model';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ListsState {
  private readonly STORAGE_KEY = 'mortyverse_custom_lists';
  private lists = signal<CustomList[]>([]);

  allLists = computed(() => this.lists());
  listCount = computed(() => this.lists().length);

  constructor(private storage: StorageService) {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const stored = this.storage.getItem<CustomList[]>(this.STORAGE_KEY);
    if (stored) {
      this.lists.set(stored);
    }
  }

  private saveToStorage(): void {
    this.storage.setItem(this.STORAGE_KEY, this.lists());
  }

  createList(dto: CreateListDto): CustomList {
    const newList: CustomList = {
      id: crypto.randomUUID(),
      name: dto.name,
      description: dto.description,
      characters: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.lists.update(current => [...current, newList]);
    this.saveToStorage();
    return newList;
  }

  updateList(id: string, dto: UpdateListDto): boolean {
    const index = this.lists().findIndex(list => list.id === id);
    if (index === -1) return false;

    this.lists.update(current => {
      const updated = [...current];
      updated[index] = {
        ...updated[index],
        ...dto,
        updatedAt: new Date()
      };
      return updated;
    });

    this.saveToStorage();
    return true;
  }

  deleteList(id: string): boolean {
    const current = this.lists();
    const filtered = current.filter(list => list.id !== id);
    
    if (filtered.length === current.length) return false;

    this.lists.set(filtered);
    this.saveToStorage();
    return true;
  }

  getListById(id: string): CustomList | undefined {
    return this.lists().find(list => list.id === id);
  }

  addCharacterToList(listId: string, character: Character): boolean {
    const index = this.lists().findIndex(list => list.id === listId);
    if (index === -1) return false;

    this.lists.update(current => {
      const updated = [...current];
      const list = updated[index];
      
      if (list.characters.some(c => c.id === character.id)) {
        return current;
      }

      updated[index] = {
        ...list,
        characters: [...list.characters, character],
        updatedAt: new Date()
      };
      return updated;
    });

    this.saveToStorage();
    return true;
  }

  removeCharacterFromList(listId: string, characterId: number): boolean {
    const index = this.lists().findIndex(list => list.id === listId);
    if (index === -1) return false;

    this.lists.update(current => {
      const updated = [...current];
      updated[index] = {
        ...updated[index],
        characters: updated[index].characters.filter(c => c.id !== characterId),
        updatedAt: new Date()
      };
      return updated;
    });

    this.saveToStorage();
    return true;
  }
}

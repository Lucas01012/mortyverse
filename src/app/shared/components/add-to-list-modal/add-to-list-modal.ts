import { Component, input, output, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Character } from '../../../core/models/character.model';
import { ListsState } from '../../../core/state/lists.state';

@Component({
  selector: 'app-add-to-list-modal',
  imports: [FormsModule],
  templateUrl: './add-to-list-modal.html',
  styleUrl: './add-to-list-modal.component.scss'
})
export class AddToListModal {
  character = input.required<Character>();
  isOpen = input.required<boolean>();
  
  close = output<void>();
  added = output<void>();

  private listsState = inject(ListsState);

  protected showNewListForm = signal(false);
  protected selectedListId = signal<string>('');
  protected newListName = signal('');
  protected newListDescription = signal('');
  
  protected lists = this.listsState.allLists;
  protected hasLists = computed(() => this.lists().length > 0);

  protected onSelectList(): void {
    const listId = this.selectedListId();
    if (!listId) return;

    const success = this.listsState.addCharacterToList(listId, this.character());
    if (success) {
      this.added.emit();
      this.closeModal();
    }
  }

  protected onCreateAndAdd(): void {
    const name = this.newListName().trim();
    if (!name) return;

    const newList = this.listsState.createList({
      name,
      description: this.newListDescription().trim() || undefined
    });

    this.listsState.addCharacterToList(newList.id, this.character());
    this.added.emit();
    this.closeModal();
  }

  protected toggleNewListForm(): void {
    this.showNewListForm.update(v => !v);
    this.newListName.set('');
    this.newListDescription.set('');
  }

  protected closeModal(): void {
    this.showNewListForm.set(false);
    this.selectedListId.set('');
    this.newListName.set('');
    this.newListDescription.set('');
    this.close.emit();
  }
}

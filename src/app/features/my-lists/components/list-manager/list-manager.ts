import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CustomList, CreateListDto, UpdateListDto } from '../../../../core/models/custom-list.model';
import { ListsState } from '../../../../core/state/lists.state';
import { ListItem } from '../list-item/list-item';
import { AddListForm } from '../add-list-form/add-list-form';

@Component({
  selector: 'app-list-manager',
  imports: [ListItem, AddListForm],
  templateUrl: './list-manager.html',
  styleUrl: './list-manager.component.scss'
})
export class ListManager {
  private listsState = inject(ListsState);
  private router = inject(Router);
  protected lists = this.listsState.allLists;
  protected showForm = signal(false);
  protected editingList = signal<CustomList | null>(null);

  protected onShowForm(): void {
    this.editingList.set(null);
    this.showForm.set(true);
  }

  protected onCreateList(dto: CreateListDto): void {
    this.listsState.createList(dto);
    this.showForm.set(false);
  }

  protected onEditList(list: CustomList): void {
    this.editingList.set(list);
    this.showForm.set(true);
  }

  protected onUpdateList(dto: UpdateListDto): void {
    const editingList = this.editingList();
    if (editingList) {
      this.listsState.updateList(editingList.id, dto);
      this.showForm.set(false);
      this.editingList.set(null);
    }
  }

  protected onDeleteList(list: CustomList): void {
    this.listsState.deleteList(list.id);
  }

  protected onCancelForm(): void {
    this.showForm.set(false);
    this.editingList.set(null);
  }

  protected onViewList(list: CustomList): void {
    this.router.navigate(['/my-lists', list.id]);
  }
}

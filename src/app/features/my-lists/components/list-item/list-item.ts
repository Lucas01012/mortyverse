import { Component, input, output } from '@angular/core';
import { CustomList } from '../../../../core/models/custom-list.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-item',
  imports: [DatePipe],
  templateUrl: './list-item.html',
  styleUrl: './list-item.component.scss'
})
export class ListItem {
  list = input.required<CustomList>();
  
  edit = output<CustomList>();
  delete = output<CustomList>();
  view = output<CustomList>();

  protected onEdit(): void {
    this.edit.emit(this.list());
  }

  protected onDelete(): void {
    if (confirm(`Tem certeza que deseja excluir a lista "${this.list().name}"?`)) {
      this.delete.emit(this.list());
    }
  }

  protected onView(): void {
    this.view.emit(this.list());
  }
}

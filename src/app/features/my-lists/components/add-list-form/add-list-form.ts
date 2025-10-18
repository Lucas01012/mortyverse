import { Component, output, input, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateListDto } from '../../../../core/models/custom-list.model';

@Component({
  selector: 'app-add-list-form',
  imports: [FormsModule],
  templateUrl: './add-list-form.html',
  styleUrl: './add-list-form.component.scss'
})
export class AddListForm {
  editMode = input<boolean>(false);
  initialName = input<string>('');
  initialDescription = input<string>('');
  
  listCreated = output<CreateListDto>();
  listUpdated = output<CreateListDto>();
  cancelled = output<void>();

  protected name = signal('');
  protected description = signal('');

  constructor() {
    effect(() => {
      if (this.editMode()) {
        this.name.set(this.initialName());
        this.description.set(this.initialDescription());
      } else {
        this.name.set('');
        this.description.set('');
      }
    });
  }

  protected onSubmit(): void {
    const trimmedName = this.name().trim();
    
    if (!trimmedName) {
      return;
    }

    const dto: CreateListDto = {
      name: trimmedName,
      description: this.description().trim() || undefined
    };

    if (this.editMode()) {
      this.listUpdated.emit(dto);
    } else {
      this.listCreated.emit(dto);
    }

    this.resetForm();
  }

  protected onCancel(): void {
    this.resetForm();
    this.cancelled.emit();
  }

  private resetForm(): void {
    this.name.set('');
    this.description.set('');
  }
}

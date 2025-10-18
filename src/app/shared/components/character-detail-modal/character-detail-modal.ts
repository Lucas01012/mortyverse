import { Component, input, output } from '@angular/core';
import { Character } from '../../../core/models/character.model';
import { Modal } from '../modal/modal';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-character-detail-modal',
  imports: [Modal, TruncatePipe],
  templateUrl: './character-detail-modal.html',
  styleUrl: './character-detail-modal.scss'
})
export class CharacterDetailModal {
  isOpen = input.required<boolean>();
  character = input<Character | null>(null);
  
  close = output<void>();

  protected onClose(): void {
    this.close.emit();
  }
}

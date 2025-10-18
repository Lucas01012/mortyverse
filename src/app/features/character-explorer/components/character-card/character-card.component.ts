import { Component, input, output } from '@angular/core';
import { Character } from '../../../../core/models/character.model';
import { LazyImageDirective } from '../../../../shared/directives/lazy-image.directive';

@Component({
  selector: 'app-character-card',
  imports: [LazyImageDirective],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCard {
  character = input.required<Character>();
  
  viewDetails = output<Character>();
  addToList = output<Character>();

  protected onViewDetails(): void {
    this.viewDetails.emit(this.character());
  }

  protected onAddToList(): void {
    this.addToList.emit(this.character());
  }
}

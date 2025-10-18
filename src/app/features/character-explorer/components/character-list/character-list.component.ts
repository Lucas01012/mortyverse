import { Component, input, output } from '@angular/core';
import { Character } from '../../../../core/models/character.model';
import { CharacterCard } from '../character-card/character-card.component';

@Component({
  selector: 'app-character-list',
  imports: [CharacterCard],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})
export class CharacterList {
  characters = input.required<Character[]>();
  isLoading = input<boolean>(false);

  viewDetails = output<Character>();
  addToList = output<Character>();

  protected onViewDetails(character: Character): void {
    this.viewDetails.emit(character);
  }

  protected onAddToList(character: Character): void {
    this.addToList.emit(character);
  }
}

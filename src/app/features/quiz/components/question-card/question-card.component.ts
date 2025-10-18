import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../../../core/models/character.model';
import { QuizQuestion } from '../../pages/guess-quiz-page.component';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCard {
  // Inputs
  question = input.required<QuizQuestion>();

  // Outputs
  answerSelected = output<Character>();

  onOptionClick(character: Character): void {
    if (this.question().answered) {
      return;
    }
    this.answerSelected.emit(character);
  }

  getOptionClass(option: Character): string {
    const question = this.question();
    
    if (!question.answered) {
      return 'option';
    }

    const isSelected = question.selectedAnswer?.id === option.id;
    const isCorrect = option.id === question.character.id;

    if (isSelected && isCorrect) {
      return 'option option--correct';
    } else if (isSelected && !isCorrect) {
      return 'option option--incorrect';
    } else if (isCorrect) {
      return 'option option--correct';
    }

    return 'option option--disabled';
  }
}

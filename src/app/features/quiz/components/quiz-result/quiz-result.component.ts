import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../../../core/models/character.model';
import { LazyImageDirective } from '../../../../shared/directives/lazy-image.directive';

@Component({
  selector: 'app-quiz-result',
  standalone: true,
  imports: [CommonModule, LazyImageDirective],
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResult {
  // Inputs
  character = input<Character | null>(null);

  // Outputs
  tryAgain = output<void>();

  onTryAgain(): void {
    this.tryAgain.emit();
  }
}

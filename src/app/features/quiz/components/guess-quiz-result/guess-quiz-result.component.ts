import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizQuestion } from '../../pages/guess-quiz-page.component';

@Component({
  selector: 'app-guess-quiz-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guess-quiz-result.component.html',
  styleUrls: ['./guess-quiz-result.component.scss']
})
export class GuessQuizResult {
  // Inputs
  score = input.required<number>();
  totalQuestions = input.required<number>();
  questions = input.required<QuizQuestion[]>();

  // Outputs
  tryAgain = output<void>();

  // Computed
  percentage = computed(() => {
    const total = this.totalQuestions();
    const score = this.score();
    return total > 0 ? Math.round((score / total) * 100) : 0;
  });

  performanceMessage = computed(() => {
    const percent = this.percentage();
    
    if (percent === 100) {
      return 'Perfeito! Você é um mestre do Mortyverse! 🏆';
    } else if (percent >= 80) {
      return 'Excelente! Você conhece muito bem o universo! 🌟';
    } else if (percent >= 60) {
      return 'Muito bem! Você está no caminho certo! 👍';
    } else if (percent >= 40) {
      return 'Bom trabalho! Continue assistindo a série! 📺';
    } else {
      return 'Precisa assistir mais Rick and Morty! 🚀';
    }
  });

  performanceEmoji = computed(() => {
    const percent = this.percentage();
    
    if (percent === 100) return '🏆';
    if (percent >= 80) return '⭐';
    if (percent >= 60) return '👏';
    if (percent >= 40) return '😊';
    return '🤔';
  });

  onTryAgain(): void {
    this.tryAgain.emit();
  }
}

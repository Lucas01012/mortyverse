import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() score!: number;
  @Input() totalQuestions!: number;
  @Input() questions!: QuizQuestion[];
  @Output() tryAgain = new EventEmitter<void>();

  // Métodos auxiliares para template (se necessário)
  scoreFn(): number {
    return this.score ?? 0;
  }
  totalQuestionsFn(): number {
    return this.totalQuestions ?? 0;
  }
  questionsFn(): QuizQuestion[] {
    return this.questions ?? [];
  }

  percentage(): number {
  const total = this.totalQuestions;
  if (!total) return 0;
  return Math.round((this.score / total) * 100);
  }

  performanceEmoji(): string {
    const p = this.percentage();
    if (p >= 80) return '🏆';
    if (p >= 60) return '😊';
    if (p >= 40) return '😐';
    return '😢';
  }

  performanceMessage(): string {
    const p = this.percentage();
    if (p >= 80) return 'Excelente! Você mandou muito bem.';
    if (p >= 60) return 'Bom trabalho! Continue praticando.';
    if (p >= 40) return 'Quase lá — continue tentando.';
    return 'Não desanime — tente novamente!';
  }

  onTryAgain(): void {
    this.tryAgain.emit();
  }
}

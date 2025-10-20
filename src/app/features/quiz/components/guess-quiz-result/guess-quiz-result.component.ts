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
  if (p >= 80) return 'Wubba Lubba Dub-Dub! Você arrebentou, gênio interdimensional!';
  if (p >= 60) return 'Nada mal, terráqueo! Tá no caminho pra virar um Morty decente.';
  if (p >= 40) return 'Ugh... já vi plumbus funcionarem melhor que isso. Continua tentando!';
  return 'Meu deus, Morty! Foi um desastre cósmico! Tenta de novo antes que o universo colapse.';
}

  onTryAgain(): void {
    this.tryAgain.emit();
  }
}

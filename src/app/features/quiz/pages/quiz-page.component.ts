import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizForm, QuizFilters } from '../components/quiz-form/quiz-form.component';
import { QuizResult } from '../components/quiz-result/quiz-result.component';
import { ApiService } from '../../../core/services/api.service';
import { Character } from '../../../core/models/character.model';

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [CommonModule, QuizForm, QuizResult],
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPage {
  private apiService = inject(ApiService);

  resultCharacter = signal<Character | null>(null);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  onFiltersSubmit(filters: QuizFilters): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.resultCharacter.set(null);

    const characterFilters: any = {
      page: 1,
      ...filters
    };

    this.apiService.getCharacters(characterFilters).subscribe({
      next: (response) => {
        if (response.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * response.results.length);
          const randomCharacter = response.results[randomIndex];
          
          this.resultCharacter.set(randomCharacter);
        } else {
          this.errorMessage.set('Nenhum personagem encontrado com esses filtros. Tente outras combinações!');
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Erro ao buscar personagens:', error);
        this.errorMessage.set('Erro ao buscar personagens. Tente novamente!');
        this.isLoading.set(false);
      }
    });
  }

  onTryAgain(): void {
    this.resultCharacter.set(null);
    this.errorMessage.set('');
  }
}

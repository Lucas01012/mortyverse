import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { Character } from '../../../core/models/character.model';
import { QuestionCard } from '../components/question-card/question-card.component';
import { GuessQuizResult } from '../components/guess-quiz-result/guess-quiz-result.component';

export interface QuizQuestion {
  character: Character;
  options: Character[];
  answered: boolean;
  selectedAnswer?: Character;
  isCorrect?: boolean;
}

@Component({
  selector: 'app-guess-quiz-page',
  standalone: true,
  imports: [CommonModule, QuestionCard, GuessQuizResult],
  templateUrl: './guess-quiz-page.component.html',
  styleUrls: ['./guess-quiz-page.component.scss']
})
export class GuessQuizPage {
  private apiService = inject(ApiService);

  private readonly TOTAL_QUESTIONS = 10;
  private readonly OPTIONS_PER_QUESTION = 4;
  private readonly MAX_CHARACTERS_IN_API = 826;

  questions = signal<QuizQuestion[]>([]);
  currentQuestionIndex = signal<number>(0);
  score = signal<number>(0);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  quizFinished = signal<boolean>(false);

  currentQuestion = computed(() => {
    const questions = this.questions();
    const index = this.currentQuestionIndex();
    return questions[index] || null;
  });

  progress = computed(() => {
    const total = this.questions().length;
    const current = this.currentQuestionIndex();
    return total > 0 ? ((current / total) * 100) : 0;
  });

  ngOnInit(): void {
    this.startQuiz();
  }

  startQuiz(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.questions.set([]);
    this.currentQuestionIndex.set(0);
    this.score.set(0);
    this.quizFinished.set(false);

    this.generateQuestions();
  }

  private async generateQuestions(): Promise<void> {
    try {
      const questions: QuizQuestion[] = [];
      const usedCharacterIds = new Set<number>();

      for (let i = 0; i < this.TOTAL_QUESTIONS; i++) {
        let correctCharacter: Character | null = null;
        let attempts = 0;
        const maxAttempts = 10;

        while (!correctCharacter && attempts < maxAttempts) {
          const randomId = Math.floor(Math.random() * this.MAX_CHARACTERS_IN_API) + 1;
          
          if (!usedCharacterIds.has(randomId)) {
            try {
              const response = await this.apiService.getCharacters({ page: Math.ceil(randomId / 20) }).toPromise();
              const character = response?.results.find(c => c.id === randomId);
              
              if (character) {
                correctCharacter = character;
                usedCharacterIds.add(randomId);
              }
            } catch (error) {
              console.error('Erro ao buscar personagem:', error);
            }
          }
          attempts++;
        }

        if (!correctCharacter) {
          continue;
        }

        const incorrectOptions: Character[] = [];
        let optionAttempts = 0;
        const maxOptionAttempts = 50;

        while (incorrectOptions.length < this.OPTIONS_PER_QUESTION - 1 && optionAttempts < maxOptionAttempts) {
          const randomId = Math.floor(Math.random() * this.MAX_CHARACTERS_IN_API) + 1;
          
          if (!usedCharacterIds.has(randomId) && randomId !== correctCharacter.id) {
            try {
              const response = await this.apiService.getCharacters({ page: Math.ceil(randomId / 20) }).toPromise();
              const character = response?.results.find(c => c.id === randomId);
              
              if (character && !incorrectOptions.find(opt => opt.id === character.id)) {
                incorrectOptions.push(character);
              }
            } catch (error) {
              console.error('Erro ao buscar opção incorreta:', error);
            }
          }
          optionAttempts++;
        }

        if (incorrectOptions.length === this.OPTIONS_PER_QUESTION - 1) {
          const allOptions = [correctCharacter, ...incorrectOptions];
          const shuffledOptions = this.shuffleArray(allOptions);

          questions.push({
            character: correctCharacter,
            options: shuffledOptions,
            answered: false
          });
        }
      }

      this.questions.set(questions);
      this.isLoading.set(false);

      if (questions.length === 0) {
        this.errorMessage.set('Erro ao gerar perguntas. Tente novamente!');
      }
    } catch (error) {
      console.error('Erro ao gerar quiz:', error);
      this.errorMessage.set('Erro ao carregar o quiz. Tente novamente!');
      this.isLoading.set(false);
    }
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  onAnswerSelected(selectedCharacter: Character): void {
    const questions = this.questions();
    const currentIndex = this.currentQuestionIndex();
    const currentQuestion = questions[currentIndex];

    if (!currentQuestion || currentQuestion.answered) {
      return;
    }

    const isCorrect = selectedCharacter.id === currentQuestion.character.id;
    currentQuestion.answered = true;
    currentQuestion.selectedAnswer = selectedCharacter;
    currentQuestion.isCorrect = isCorrect;

    if (isCorrect) {
      this.score.update(s => s + 1);
    }

    this.questions.set([...questions]);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        this.currentQuestionIndex.set(currentIndex + 1);
      } else {
        this.quizFinished.set(true);
      }
    }, 1500);
  }

  onTryAgain(): void {
    this.startQuiz();
  }
}

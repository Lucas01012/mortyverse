import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizQuestionComponent } from '../components/quiz-question.component';

@Component({
  selector: 'app-quiz-page',
  imports: [CommonModule, QuizQuestionComponent],
  template: `
    <div class="quiz-page">
      <!-- Quiz Header -->
      <header class="quiz-header">
        <div class="container">
          <div class="quiz-header__content">
            <h1 class="quiz-header__title">Rick & Morty Quiz</h1>
            <p class="quiz-header__subtitle">Test your interdimensional knowledge</p>
          </div>
          
          <div class="quiz-header__score">
            <div class="score-card">
              <span class="score-card__label">Score</span>
              <span class="score-card__value">{{ correctAnswers }}/{{ totalQuestions }}</span>
            </div>
            
            <div class="score-card">
              <span class="score-card__label">Progress</span>
              <span class="score-card__value">{{ currentQuestion }}/{{ totalQuestions }}</span>
            </div>
          </div>
        </div>
      </header>
      
      <!-- Quiz Content -->
      <main class="quiz-content">
        <div class="container">
          <div class="quiz-wrapper" *ngIf="!quizCompleted">
            <app-quiz-question
              [question]="questions[currentQuestion - 1].question"
              [options]="questions[currentQuestion - 1].options"
              [correctAnswer]="questions[currentQuestion - 1].correctAnswer"
              [questionNumber]="currentQuestion"
              [totalQuestions]="totalQuestions"
              [imageUrl]="questions[currentQuestion - 1].imageUrl"
              [explanation]="questions[currentQuestion - 1].explanation"
              (answerSelected)="onAnswerSelected($event)"
            />
            
            <div class="quiz-actions" *ngIf="answerSelected">
              <button 
                class="btn btn-primary btn-lg"
                (click)="nextQuestion()"
              >
                <span>{{ currentQuestion === totalQuestions ? 'Finish Quiz' : 'Next Question' }}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Quiz Results -->
          <div class="quiz-results" *ngIf="quizCompleted">
            <div class="results-card">
              <div class="results-card__portal">
                <div class="results-card__portal-ring"></div>
                <div class="results-card__portal-ring"></div>
                <div class="results-card__portal-ring"></div>
              </div>
              
              <div class="results-card__icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              
              <h2 class="results-card__title">Quiz Completed!</h2>
              <p class="results-card__subtitle">{{ getResultMessage() }}</p>
              
              <div class="results-card__stats">
                <div class="result-stat">
                  <span class="result-stat__value">{{ correctAnswers }}</span>
                  <span class="result-stat__label">Correct Answers</span>
                </div>
                
                <div class="result-stat">
                  <span class="result-stat__value">{{ getPercentage() }}%</span>
                  <span class="result-stat__label">Success Rate</span>
                </div>
                
                <div class="result-stat">
                  <span class="result-stat__value">{{ totalQuestions }}</span>
                  <span class="result-stat__label">Total Questions</span>
                </div>
              </div>
              
              <div class="results-card__actions">
                <button class="btn btn-outline btn-lg" (click)="restartQuiz()">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                  </svg>
                  <span>Try Again</span>
                </button>
                
                <button class="btn btn-primary btn-lg">
                  <span>Share Results</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent {
  currentQuestion = 1;
  totalQuestions = 5;
  correctAnswers = 0;
  answerSelected = false;
  quizCompleted = false;
  
  questions = [
    {
      question: 'What is the name of Rick\'s grandson?',
      options: ['Jerry', 'Morty', 'Summer', 'Beth'],
      correctAnswer: 1,
      imageUrl: '',
      explanation: 'Morty Smith is Rick\'s grandson and his main adventure companion throughout the series.'
    },
    {
      question: 'What color is Rick\'s portal gun?',
      options: ['Blue', 'Green', 'Red', 'Purple'],
      correctAnswer: 1,
      imageUrl: '',
      explanation: 'Rick\'s portal gun emits a distinctive green portal that allows interdimensional travel.'
    },
    {
      question: 'What is Rick\'s catchphrase?',
      options: ['Oh Jeez!', 'Wubba Lubba Dub Dub!', 'Get Schwifty!', 'Show me what you got!'],
      correctAnswer: 1,
      imageUrl: '',
      explanation: 'Wubba Lubba Dub Dub is Rick\'s famous catchphrase, which actually means "I am in great pain, please help me" in Bird Person\'s language.'
    },
    {
      question: 'What is the name of Rick\'s dimension?',
      options: ['Earth C-137', 'Earth C-500A', 'Earth Prime', 'Earth Zero'],
      correctAnswer: 0,
      imageUrl: '',
      explanation: 'Rick C-137 is the main Rick we follow in the series, from dimension C-137.'
    },
    {
      question: 'Who is Rick\'s best friend?',
      options: ['Squanchy', 'Bird Person', 'Mr. Poopybutthole', 'Birdperson'],
      correctAnswer: 1,
      imageUrl: '',
      explanation: 'Bird Person (also known as Phoenixperson after his resurrection) is Rick\'s oldest and closest friend.'
    }
  ];
  
  onAnswerSelected(event: { answer: number; isCorrect: boolean }): void {
    this.answerSelected = true;
    if (event.isCorrect) {
      this.correctAnswers++;
    }
  }
  
  nextQuestion(): void {
    if (this.currentQuestion < this.totalQuestions) {
      this.currentQuestion++;
      this.answerSelected = false;
    } else {
      this.quizCompleted = true;
    }
  }
  
  restartQuiz(): void {
    this.currentQuestion = 1;
    this.correctAnswers = 0;
    this.answerSelected = false;
    this.quizCompleted = false;
  }
  
  getPercentage(): number {
    return Math.round((this.correctAnswers / this.totalQuestions) * 100);
  }
  
  getResultMessage(): string {
    const percentage = this.getPercentage();
    if (percentage === 100) return 'Perfect! You\'re a true Rick and Morty expert! 🛸';
    if (percentage >= 80) return 'Excellent! Wubba Lubba Dub Dub! 🎉';
    if (percentage >= 60) return 'Good job! You know your stuff! 👍';
    if (percentage >= 40) return 'Not bad! Keep watching the show! 📺';
    return 'Oh jeez! Time for a Rick and Morty marathon! 😅';
  }
}

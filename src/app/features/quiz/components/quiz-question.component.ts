import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-quiz-question',
	standalone: true,
	imports: [CommonModule],
	template: `
		<div class="quiz-question" [class.quiz-question--answered]="selectedAnswer !== null">
			<div class="quiz-question__header">
				<div class="quiz-question__number">
					<span class="quiz-question__number-label">Question</span>
					<span class="quiz-question__number-value">{{ questionNumber }}</span>
				</div>
        
				<div class="quiz-question__progress">
					<div class="quiz-question__progress-bar">
						<div 
							class="quiz-question__progress-fill" 
							[style.width.%]="(questionNumber / totalQuestions) * 100"
						></div>
					</div>
					<span class="quiz-question__progress-text">
						{{ questionNumber }} / {{ totalQuestions }}
					</span>
				</div>
			</div>
      
			<div class="quiz-question__body">
				<div class="quiz-question__image" *ngIf="imageUrl">
					<img 
						[src]="imageUrl" 
						[alt]="'Question ' + questionNumber"
						class="quiz-question__image-el"
						loading="lazy"
					/>
					<div class="quiz-question__image-overlay"></div>
				</div>
        
				<h2 class="quiz-question__title">{{ question }}</h2>
        
				<div class="quiz-question__options">
					<button
						*ngFor="let option of options; let i = index"
						class="quiz-question__option"
						[class.quiz-question__option--selected]="selectedAnswer === i"
						[class.quiz-question__option--correct]="showResult && i === correctAnswer"
						[class.quiz-question__option--incorrect]="showResult && selectedAnswer === i && i !== correctAnswer"
						[disabled]="selectedAnswer !== null"
						(click)="selectAnswer(i)"
					>
						<span class="quiz-question__option-letter">
							{{ getLetter(i) }}
						</span>
						<span class="quiz-question__option-text">{{ option }}</span>
            
						<span class="quiz-question__option-icon" *ngIf="showResult && (i === correctAnswer || selectedAnswer === i)">
							<svg 
								*ngIf="i === correctAnswer" 
								width="24" 
								height="24" 
								viewBox="0 0 24 24" 
								fill="none" 
								stroke="currentColor" 
								stroke-width="3"
							>
								<polyline points="20 6 9 17 4 12"></polyline>
							</svg>
              
							<svg 
								*ngIf="selectedAnswer === i && i !== correctAnswer" 
								width="24" 
								height="24" 
								viewBox="0 0 24 24" 
								fill="none" 
								stroke="currentColor" 
								stroke-width="3"
							>
								<line x1="18" y1="6" x2="6" y2="18"></line>
								<line x1="6" y1="6" x2="18" y2="18"></line>
							</svg>
						</span>
					</button>
				</div>
        
				<div class="quiz-question__result" *ngIf="showResult">
					<div 
						class="quiz-question__result-card"
						[class.quiz-question__result-card--correct]="isCorrect"
						[class.quiz-question__result-card--incorrect]="!isCorrect"
					>
						<div class="quiz-question__result-icon">
							<svg 
								*ngIf="isCorrect" 
								width="48" 
								height="48" 
								viewBox="0 0 24 24" 
								fill="none" 
								stroke="currentColor" 
								stroke-width="2"
							>
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
              
							<svg 
								*ngIf="!isCorrect" 
								width="48" 
								height="48" 
								viewBox="0 0 24 24" 
								fill="none" 
								stroke="currentColor" 
								stroke-width="2"
							>
								<circle cx="12" cy="12" r="10"></circle>
								<line x1="15" y1="9" x2="9" y2="15"></line>
								<line x1="9" y1="9" x2="15" y2="15"></line>
							</svg>
						</div>
            
						<h3 class="quiz-question__result-title">
							{{ isCorrect ? 'Wubba Lubba Dub Dub!' : 'Oh Jeez!' }}
						</h3>
            
						<p class="quiz-question__result-text">
							{{ isCorrect ? 'Correct answer!' : 'Wrong answer!' }}
						</p>
            
						<p class="quiz-question__explanation" *ngIf="explanation">
							{{ explanation }}
						</p>
					</div>
				</div>
			</div>
      
			<div class="quiz-question__portal quiz-question__portal--1"></div>
			<div class="quiz-question__portal quiz-question__portal--2"></div>
		</div>
	`,
		styleUrls: ['./quiz-question.component.scss']
})
export class QuizQuestionComponent {
	@Input() question = '';
	@Input() options: string[] = [];
	@Input() correctAnswer = 0;
	@Input() questionNumber = 1;
	@Input() totalQuestions = 10;
	@Input() imageUrl = '';
	@Input() explanation = '';
  
	@Output() answerSelected = new EventEmitter<{ answer: number; isCorrect: boolean }>();
  
	selectedAnswer: number | null = null;
	showResult = false;
	isCorrect = false;
  
	getLetter(index: number): string {
		return String.fromCharCode(65 + index); // A, B, C, D...
	}
  
	selectAnswer(index: number): void {
		if (this.selectedAnswer !== null) return;
    
		this.selectedAnswer = index;
		this.isCorrect = index === this.correctAnswer;
    
		setTimeout(() => {
			this.showResult = true;
			this.answerSelected.emit({ 
				answer: index, 
				isCorrect: this.isCorrect 
			});
		}, 300);
	}
  
	reset(): void {
		this.selectedAnswer = null;
		this.showResult = false;
		this.isCorrect = false;
	}
}

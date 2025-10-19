import { TestBed } from '@angular/core/testing';
import { GuessQuizPage } from './guess-quiz-page.component';
import { ApiService } from '../../../core/services/api.service';
import { of } from 'rxjs';

describe('GuessQuizPage', () => {
  let component: GuessQuizPage;

  beforeEach(async () => {
    // Provide a minimal ApiService mock because the component injects it.
    const mockApi = { getCharacters: jest.fn(() => of({ results: [] })) };

    await TestBed.configureTestingModule({
      imports: [GuessQuizPage],
      providers: [
        { provide: ApiService, useValue: mockApi }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(GuessQuizPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('should call startQuiz when onTryAgain is invoked', () => {
    const spy = jest.spyOn(component, 'startQuiz');
    component.onTryAgain();
    expect(spy).toHaveBeenCalled();
  });

  it('startQuiz should reset state and call generateQuestions', async () => {
    const genSpy = jest.spyOn<any, any>(component as any, 'generateQuestions').mockImplementation(() => Promise.resolve());
    component.isLoading.set(false);
    component.errorMessage.set('some');

    await component.startQuiz();

    expect(component.isLoading()).toBe(true);
    expect(component.errorMessage()).toBe('');
    expect(component.currentQuestionIndex()).toBe(0);
    expect(component.score()).toBe(0);
    expect(genSpy).toHaveBeenCalled();
  });

  it('onAnswerSelected should mark correct answer, update score and finish quiz when last question', () => {
    jest.useFakeTimers();

    const correct = { id: 1, name: 'Rick' } as any;
    const q = { character: correct, options: [correct], answered: false } as any;

    component.questions.set([q]);
    component.currentQuestionIndex.set(0);
    component.score.set(0);

    component.onAnswerSelected(correct);

    const questions = component.questions();
    expect(questions[0].answered).toBe(true);
    expect(questions[0].selectedAnswer).toBe(correct);
    expect(questions[0].isCorrect).toBe(true);
    expect(component.score()).toBe(1);

    // Advance timer to trigger quiz finish (only one question)
    jest.advanceTimersByTime(1500);
    expect(component.quizFinished()).toBe(true);
  });

  it('onAnswerSelected should mark incorrect answer and advance index when more questions exist', () => {
    jest.useFakeTimers();

    const correct = { id: 1, name: 'Morty' } as any;
    const wrong = { id: 2, name: 'Summer' } as any;
    const q1 = { character: correct, options: [correct, wrong], answered: false } as any;
    const q2 = { character: { id: 3 }, options: [], answered: false } as any;

    component.questions.set([q1, q2]);
    component.currentQuestionIndex.set(0);
    component.score.set(0);

    component.onAnswerSelected(wrong);

    const questions = component.questions();
    expect(questions[0].answered).toBe(true);
    expect(questions[0].selectedAnswer).toBe(wrong);
    expect(questions[0].isCorrect).toBe(false);
    expect(component.score()).toBe(0);

    // Advance timer to move to next question
    jest.advanceTimersByTime(1500);
    expect(component.currentQuestionIndex()).toBe(1);
  });

  it('shuffleArray should return same items in different order (or same for small arrays) but same length and members', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = (component as any).shuffleArray(arr);
    expect(shuffled).toHaveLength(arr.length);
    // contains same elements
    expect(shuffled.sort()).toEqual(arr.sort());
  });
});

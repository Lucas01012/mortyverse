import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuessQuizPage, QuizQuestion } from './guess-quiz-page.component';
import { ApiService } from '../../../core/services/api.service';
import { of } from 'rxjs';
import { Character } from '../../../core/models/character.model';

describe('GuessQuizPage', () => {
  let fixture: ComponentFixture<GuessQuizPage>;
  let component: GuessQuizPage;

  beforeEach(async () => {
    const mockApi = { getCharacters: jest.fn(() => of({ results: [] })) };

    await TestBed.configureTestingModule({
      imports: [GuessQuizPage],
      providers: [{ provide: ApiService, useValue: mockApi }]
    }).compileComponents();

    fixture = TestBed.createComponent(GuessQuizPage);
    component = fixture.componentInstance;
  });

  afterEach(() => jest.useRealTimers());

  it('startQuiz resets state and calls generateQuestions', () => {
    const spy = jest.spyOn<any, any>(component as any, 'generateQuestions').mockImplementation(() => Promise.resolve());

    (component as any).score.set(5);
    (component as any).currentQuestionIndex.set(3);
    (component as any).quizFinished.set(true);

    component.startQuiz();

    expect(component.isLoading()).toBe(true);
    expect(component.score()).toBe(0);
    expect(component.currentQuestionIndex()).toBe(0);
    expect(component.quizFinished()).toBe(false);
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });

  it('shuffleArray returns permutation with same members', () => {
    const arr = [1, 2, 3, 4, 5];
    const out = (component as any).shuffleArray(arr);
    expect(out).toHaveLength(arr.length);
    expect(out.sort()).toEqual(arr.sort());
  });

  it('onAnswerSelected correct increments score and advances; incorrect advances or finishes', () => {
    jest.useFakeTimers();

    const charA: Character = { id: 1, name: 'A', image: '' } as any;
    const charB: Character = { id: 2, name: 'B', image: '' } as any;

    const q1: QuizQuestion = { character: charA, options: [charA, charB], answered: false };
    const q2: QuizQuestion = { character: charB, options: [charA, charB], answered: false };

    component.questions.set([q1, q2]);
    component.currentQuestionIndex.set(0);

    component.onAnswerSelected(charA);
    expect(component.questions()[0].answered).toBe(true);
    expect(component.questions()[0].isCorrect).toBe(true);
    expect(component.score()).toBe(1);

    jest.advanceTimersByTime(1500);
    expect(component.currentQuestionIndex()).toBe(1);

    component.onAnswerSelected(charA);
    expect(component.questions()[1].answered).toBe(true);
    expect(component.questions()[1].isCorrect).toBe(false);

    jest.advanceTimersByTime(1500);
    expect(component.quizFinished()).toBe(true);
  });

  it('onAnswerSelected is safe when questions missing or already answered', () => {
    const char: Character = { id: 99, name: 'X', image: '' } as any;
    component.questions.set([]);
    expect(() => component.onAnswerSelected(char)).not.toThrow();

    const q: QuizQuestion = { character: char, options: [char], answered: true };
    component.questions.set([q]);
    component.currentQuestionIndex.set(0);
    expect(() => component.onAnswerSelected(char)).not.toThrow();
  });

  it('onTryAgain calls startQuiz', () => {
    const spy = jest.spyOn(component, 'startQuiz');
    component.onTryAgain();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('generateQuestions sets errorMessage when API always fails', async () => {
    const mockApi = (TestBed.inject as any)(ApiService) as any;
    mockApi.getCharacters.mockImplementation(() => {
      const { throwError } = require('rxjs');
      return throwError(() => new Error('API Fail'));
    });

    await (component as any).generateQuestions();

    expect(component.questions().length).toBe(0);
    expect(component.isLoading()).toBe(false);
    expect(component.errorMessage()).toBe('Erro ao gerar perguntas. Tente novamente!');
  });

  it('generateQuestions builds questions when API returns characters and Math.random controlled', async () => {
    const characters = Array.from({ length: 120 }, (_, i) => ({ id: i + 1, name: `C${i + 1}`, image: '' }));

    const mockApi = (TestBed.inject as any)(ApiService) as any;
    mockApi.getCharacters.mockImplementation(() => {
      return of({ results: characters });
    });

    const MAX = (component as any).MAX_CHARACTERS_IN_API || 826;
    const seq = Array.from({ length: 500 }, (_, i) => (i + 0.1) / MAX);
    let idx = 0;
    const originalRandom = Math.random;
    Math.random = () => seq[idx++ % seq.length];

    await (component as any).generateQuestions();

    expect(component.isLoading()).toBe(false);
    expect(component.questions().length).toBeGreaterThan(0);
    expect(component.errorMessage()).toBe('');

    Math.random = originalRandom;
  });
})

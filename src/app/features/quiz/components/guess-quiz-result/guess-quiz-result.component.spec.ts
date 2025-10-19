import { TestBed } from '@angular/core/testing';
import { GuessQuizResult } from './guess-quiz-result.component';

describe('GuessQuizResult', () => {
  let fixture: any;
  let component: GuessQuizResult;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [GuessQuizResult] }).compileComponents();
    fixture = TestBed.createComponent(GuessQuizResult);
    component = fixture.componentInstance;
  });

  it('displays numeric inputs correctly', () => {
    component.score = 3;
    component.totalQuestions = 10;
    fixture.detectChanges();

    expect(component.score).toBe(3);
    expect(component.totalQuestions).toBe(10);
  });

  it('scoreFn returns score or 0', () => {
    component.score = 5;
    expect(component.scoreFn()).toBe(5);
    component.score = undefined as any;
    expect(component.scoreFn()).toBe(0);
    component.score = null as any;
    expect(component.scoreFn()).toBe(0);
  });

  it('totalQuestionsFn returns totalQuestions or 0', () => {
    component.totalQuestions = 8;
    expect(component.totalQuestionsFn()).toBe(8);
    component.totalQuestions = undefined as any;
    expect(component.totalQuestionsFn()).toBe(0);
    component.totalQuestions = null as any;
    expect(component.totalQuestionsFn()).toBe(0);
  });

  it('questionsFn returns questions or []', () => {
    const arr = [{}, {}] as any;
    component.questions = arr;
    expect(component.questionsFn()).toBe(arr);
    component.questions = undefined as any;
    expect(component.questionsFn()).toEqual([]);
    component.questions = null as any;
    expect(component.questionsFn()).toEqual([]);
  });

  it('emits tryAgain when button clicked', () => {
    const spy = jest.fn();
    (component as any).tryAgain.subscribe(spy as any);
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();
    expect(spy).toHaveBeenCalled();
  });

  it('performanceEmoji returns sad emoji when totalQuestions is zero', () => {
    component.score = 5;
    component.totalQuestions = 0;
    expect(component.performanceEmoji()).toBe('😢');
  });

  it('performanceMessage returns desanime message when totalQuestions is zero', () => {
    component.score = 5;
    component.totalQuestions = 0;
    expect(component.performanceMessage()).toContain('Não desanime');
  });
})

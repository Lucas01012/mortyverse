import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizResult } from './quiz-result.component';

describe('QuizResult', () => {
  let component: QuizResult;
  let fixture: ComponentFixture<QuizResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizForm } from './quiz-form.component';

describe('QuizForm', () => {
  let component: QuizForm;
  let fixture: ComponentFixture<QuizForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty filters', () => {
    expect(component.selectedStatus()).toBe('');
    expect(component.selectedSpecies()).toBe('');
    expect(component.selectedGender()).toBe('');
  });

  it('should have status options', () => {
    expect(component.statusOptions.length).toBeGreaterThan(0);
    expect(component.statusOptions[0].value).toBe('');
  });

  it('should have species options', () => {
    expect(component.speciesOptions.length).toBeGreaterThan(0);
    expect(component.speciesOptions[0].value).toBe('');
  });

  it('should have gender options', () => {
    expect(component.genderOptions.length).toBeGreaterThan(0);
    expect(component.genderOptions[0].value).toBe('');
  });

  it('should emit filters on submit with all fields', () => {
    const spy = jest.fn();
    (component as any).submitFilters.subscribe(spy);

    component.selectedStatus.set('Alive');
    component.selectedSpecies.set('Human');
    component.selectedGender.set('Male');

    component.onSubmit();

    expect(spy).toHaveBeenCalledWith({
      status: 'Alive',
      species: 'Human',
      gender: 'Male'
    });
  });

  it('should emit partial filters on submit', () => {
    const spy = jest.fn();
    (component as any).submitFilters.subscribe(spy);

    component.selectedStatus.set('Alive');

    component.onSubmit();

    expect(spy).toHaveBeenCalledWith({
      status: 'Alive'
    });
  });

  it('should emit empty filters when no selection', () => {
    const spy = jest.fn();
    (component as any).submitFilters.subscribe(spy);

    component.onSubmit();

    expect(spy).toHaveBeenCalledWith({});
  });

  it('should reset all filters on reset', () => {
    component.selectedStatus.set('Alive');
    component.selectedSpecies.set('Human');
    component.selectedGender.set('Male');

    component.onReset();

    expect(component.selectedStatus()).toBe('');
    expect(component.selectedSpecies()).toBe('');
    expect(component.selectedGender()).toBe('');
  });

  it('should update status signal', () => {
    component.selectedStatus.set('Dead');
    expect(component.selectedStatus()).toBe('Dead');
  });

  it('should update species signal', () => {
    component.selectedSpecies.set('Alien');
    expect(component.selectedSpecies()).toBe('Alien');
  });

  it('should update gender signal', () => {
    component.selectedGender.set('Female');
    expect(component.selectedGender()).toBe('Female');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionCard } from './question-card.component';
import { Character } from '../../../../core/models/character.model';

describe('QuestionCard', () => {
  let component: QuestionCard;
  let fixture: ComponentFixture<QuestionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionCard);
    component = fixture.componentInstance;
    
    const mockQuestion = {
      character: {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth', url: '' },
        location: { name: 'Earth', url: '' },
        image: 'https://example.com/rick.png',
        episode: [],
        url: '',
        created: ''
      },
      options: [],
      answered: false
    };
    
    fixture.componentRef.setInput('question', mockQuestion);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have question input', () => {
    expect(component.question()).toBeDefined();
  });

  it('should emit answerSelected when option clicked and not answered', () => {
    const spy = jest.fn();
    (component as any).answerSelected.subscribe(spy);

    const mockCharacter: Character = {
      id: 2,
      name: 'Morty',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: 'https://example.com/morty.png',
      episode: [],
      url: '',
      created: ''
    };

    component.onOptionClick(mockCharacter);

    expect(spy).toHaveBeenCalledWith(mockCharacter);
  });

  it('should not emit when option clicked and already answered', () => {
    const spy = jest.fn();
    (component as any).answerSelected.subscribe(spy);

    const answeredQuestion = {
      character: {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth', url: '' },
        location: { name: 'Earth', url: '' },
        image: 'https://example.com/rick.png',
        episode: [],
        url: '',
        created: ''
      },
      options: [],
      answered: true
    };
    fixture.componentRef.setInput('question', answeredQuestion);
    fixture.detectChanges();

    const mockCharacter: Character = {
      id: 2,
      name: 'Morty',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: 'https://example.com/morty.png',
      episode: [],
      url: '',
      created: ''
    };

    component.onOptionClick(mockCharacter);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should return "option" class when not answered', () => {
    const mockCharacter: Character = {
      id: 2,
      name: 'Morty',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: 'https://example.com/morty.png',
      episode: [],
      url: '',
      created: ''
    };

    const result = component.getOptionClass(mockCharacter);

    expect(result).toBe('option');
  });

  it('should return correct class when answered correctly', () => {
    const correctCharacter: Character = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: 'https://example.com/rick.png',
      episode: [],
      url: '',
      created: ''
    };

    const answeredQuestion = {
      character: correctCharacter,
      options: [correctCharacter],
      answered: true,
      selectedAnswer: correctCharacter,
      isCorrect: true
    };
    fixture.componentRef.setInput('question', answeredQuestion);
    fixture.detectChanges();

    const result = component.getOptionClass(correctCharacter);

    expect(result).toBe('option option--correct');
  });

  it('should return incorrect class when answered wrongly', () => {
    const correctCharacter: Character = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: 'https://example.com/rick.png',
      episode: [],
      url: '',
      created: ''
    };

    const wrongCharacter: Character = {
      id: 2,
      name: 'Morty',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: 'https://example.com/morty.png',
      episode: [],
      url: '',
      created: ''
    };

    const answeredQuestion = {
      character: correctCharacter,
      options: [correctCharacter, wrongCharacter],
      answered: true,
      selectedAnswer: wrongCharacter,
      isCorrect: false
    };
    fixture.componentRef.setInput('question', answeredQuestion);
    fixture.detectChanges();

    const result = component.getOptionClass(wrongCharacter);

    expect(result).toBe('option option--incorrect');
  });

  it('should show correct answer even when not selected', () => {
    const correctCharacter: Character = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: 'https://example.com/rick.png',
      episode: [],
      url: '',
      created: ''
    };

    const wrongCharacter: Character = {
      id: 2,
      name: 'Morty',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: 'https://example.com/morty.png',
      episode: [],
      url: '',
      created: ''
    };

    const answeredQuestion = {
      character: correctCharacter,
      options: [correctCharacter, wrongCharacter],
      answered: true,
      selectedAnswer: wrongCharacter,
      isCorrect: false
    };
    fixture.componentRef.setInput('question', answeredQuestion);
    fixture.detectChanges();

    const result = component.getOptionClass(correctCharacter);

    expect(result).toBe('option option--correct');
  });

  it('should disable non-selected options after answer', () => {
    const correctCharacter: Character = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: 'https://example.com/rick.png',
      episode: [],
      url: '',
      created: ''
    };

    const wrongCharacter: Character = {
      id: 2,
      name: 'Morty',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: 'https://example.com/morty.png',
      episode: [],
      url: '',
      created: ''
    };

    const otherCharacter: Character = {
      id: 3,
      name: 'Summer',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Female',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: 'https://example.com/summer.png',
      episode: [],
      url: '',
      created: ''
    };

    const answeredQuestion = {
      character: correctCharacter,
      options: [correctCharacter, wrongCharacter, otherCharacter],
      answered: true,
      selectedAnswer: wrongCharacter,
      isCorrect: false
    };
    fixture.componentRef.setInput('question', answeredQuestion);
    fixture.detectChanges();

    const result = component.getOptionClass(otherCharacter);

    expect(result).toBe('option option--disabled');
  });
});


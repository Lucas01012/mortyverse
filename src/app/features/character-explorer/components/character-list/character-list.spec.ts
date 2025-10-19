import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterList } from './character-list.component';

describe('CharacterList', () => {
  let component: CharacterList;
  let fixture: ComponentFixture<CharacterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterList);
    component = fixture.componentInstance;
    // provide minimal required input (handle signal-style inputs)
    const assignSignal = (sigName: string, val: any) => {
      const target = (component as any)[sigName];
      if (typeof target === 'function') {
        let v = val;
        const fn: any = () => v;
        fn.set = (newVal: any) => { v = newVal; };
        (component as any)[sigName] = fn;
      } else if (target && typeof target.set === 'function') {
        target.set(val);
      } else {
        (component as any)[sigName] = val;
      }
    };

    assignSignal('characters', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit viewDetails when onViewDetails is called', () => {
    const spy = jest.fn();
    (component as any).viewDetails.subscribe(spy);

    const mockCharacter: any = {
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

    (component as any).onViewDetails(mockCharacter);

    expect(spy).toHaveBeenCalledWith(mockCharacter);
  });

  it('should emit addToList when onAddToList is called', () => {
    const spy = jest.fn();
    (component as any).addToList.subscribe(spy);

    const mockCharacter: any = {
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

    (component as any).onAddToList(mockCharacter);

    expect(spy).toHaveBeenCalledWith(mockCharacter);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCard } from './character-card.component';

describe('CharacterCard', () => {
  let component: CharacterCard;
  let fixture: ComponentFixture<CharacterCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterCard);
    component = fixture.componentInstance;
    const mockChar = { id: 1, name: 'Rick', status: 'Alive', species: 'Human', image: '' };
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

    assignSignal('character', mockChar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onViewDetails', () => {
    it('should emit viewDetails with character', () => {
      const viewDetailsSpy = jest.fn();
      (component as any).viewDetails.subscribe(viewDetailsSpy);
      
      (component as any).onViewDetails();
      
      expect(viewDetailsSpy).toHaveBeenCalledWith((component as any).character());
    });
  });

  describe('onAddToList', () => {
    it('should emit addToList with character', () => {
      const addToListSpy = jest.fn();
      (component as any).addToList.subscribe(addToListSpy);
      
      (component as any).onAddToList();
      
      expect(addToListSpy).toHaveBeenCalledWith((component as any).character());
    });
  });

  describe('onRemoveFromList', () => {
    it('should emit removeFromList with character', () => {
      const removeFromListSpy = jest.fn();
      (component as any).removeFromList.subscribe(removeFromListSpy);
      
      (component as any).onRemoveFromList();
      
      expect(removeFromListSpy).toHaveBeenCalledWith((component as any).character());
    });
  });
});

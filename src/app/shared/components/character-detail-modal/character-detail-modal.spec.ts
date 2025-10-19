import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterDetailModal } from './character-detail-modal';
import { Character } from '../../../core/models/character.model';

describe('CharacterDetailModal', () => {
  let component: CharacterDetailModal;
  let fixture: ComponentFixture<CharacterDetailModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterDetailModal]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterDetailModal);
    component = fixture.componentInstance;
    
    // Set required inputs
    fixture.componentRef.setInput('isOpen', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close when onClose is called', () => {
    const emitSpy = jest.fn();
    (component as any).close.subscribe(emitSpy);
    
    (component as any).onClose();
    
    expect(emitSpy).toHaveBeenCalled();
  });
});

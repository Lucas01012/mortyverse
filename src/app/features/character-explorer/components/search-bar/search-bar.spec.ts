import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBar } from './search-bar.component';

describe('SearchBar', () => {
  let component: SearchBar;
  let fixture: ComponentFixture<SearchBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSearchChange', () => {
    it('should emit searchChange with input value', () => {
      const searchChangeSpy = jest.fn();
      (component as any).searchChange.subscribe(searchChangeSpy);
      
      const event = {
        target: { value: 'Rick' }
      } as any;
      
      (component as any).onSearchChange(event);
      
      expect(searchChangeSpy).toHaveBeenCalledWith('Rick');
    });
  });

  describe('onStatusChange', () => {
    it('should emit statusChange with select value', () => {
      const statusChangeSpy = jest.fn();
      (component as any).statusChange.subscribe(statusChangeSpy);
      
      const event = {
        target: { value: 'Alive' }
      } as any;
      
      (component as any).onStatusChange(event);
      
      expect(statusChangeSpy).toHaveBeenCalledWith('Alive');
    });
  });

  describe('onGenderChange', () => {
    it('should emit genderChange with select value', () => {
      const genderChangeSpy = jest.fn();
      (component as any).genderChange.subscribe(genderChangeSpy);
      
      const event = {
        target: { value: 'Male' }
      } as any;
      
      (component as any).onGenderChange(event);
      
      expect(genderChangeSpy).toHaveBeenCalledWith('Male');
    });
  });

  describe('onClear', () => {
    it('should emit searchChange with empty string', () => {
      const searchChangeSpy = jest.fn();
      (component as any).searchChange.subscribe(searchChangeSpy);
      
      (component as any).onClear();
      
      expect(searchChangeSpy).toHaveBeenCalledWith('');
    });
  });
});


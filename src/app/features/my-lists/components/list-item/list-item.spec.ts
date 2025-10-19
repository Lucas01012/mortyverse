import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItem } from './list-item';

describe('ListItem', () => {
  let component: ListItem;
  let fixture: ComponentFixture<ListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItem);
    component = fixture.componentInstance;
    // provide minimal required input (component may use signal-style inputs)
    const mockList = {
      id: '1',
      name: 'My List',
      description: 'A test list',
      characters: [],
      createdAt: new Date().toISOString()
    };
    const currentList = { value: mockList };
    const assignSignal = (sigName: string, val: any) => {
      const target = (component as any)[sigName];
      if (typeof target === 'function') {
        // function-style signal (callable) -> wrap to provide .set
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

    assignSignal('list', mockList);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onEdit', () => {
    it('should emit edit event with list', () => {
      const editSpy = jest.fn();
      (component as any).edit.subscribe(editSpy);
      
      (component as any).onEdit();
      
      expect(editSpy).toHaveBeenCalledWith((component as any).list());
    });
  });

  describe('onDelete', () => {
    it('should emit delete event when confirmed', () => {
      jest.spyOn(window, 'confirm').mockReturnValue(true);
      const deleteSpy = jest.fn();
      (component as any).delete.subscribe(deleteSpy);
      
      (component as any).onDelete();
      
      expect(deleteSpy).toHaveBeenCalledWith((component as any).list());
    });

    it('should not emit delete event when not confirmed', () => {
      jest.spyOn(window, 'confirm').mockReturnValue(false);
      const deleteSpy = jest.fn();
      (component as any).delete.subscribe(deleteSpy);
      
      (component as any).onDelete();
      
      expect(deleteSpy).not.toHaveBeenCalled();
    });
  });

  describe('onView', () => {
    it('should emit view event with list', () => {
      const viewSpy = jest.fn();
      (component as any).view.subscribe(viewSpy);
      
      (component as any).onView();
      
      expect(viewSpy).toHaveBeenCalledWith((component as any).list());
    });
  });
});

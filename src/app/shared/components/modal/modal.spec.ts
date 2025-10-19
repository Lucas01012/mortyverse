import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modal } from './modal';

describe('Modal', () => {
  let component: Modal;
  let fixture: ComponentFixture<Modal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Modal);
    component = fixture.componentInstance;
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

    assignSignal('isOpen', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClose', () => {
    it('should emit close event', () => {
      const closeSpy = jest.fn();
      (component as any).close.subscribe(closeSpy);
      
      (component as any).onClose();
      
      expect(closeSpy).toHaveBeenCalled();
    });
  });

  describe('onBackdropClick', () => {
    it('should close modal when closeOnBackdrop is true', () => {
      const closeSpy = jest.fn();
      (component as any).close.subscribe(closeSpy);
      
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
      assignSignal('closeOnBackdrop', true);
      
      (component as any).onBackdropClick();
      
      expect(closeSpy).toHaveBeenCalled();
    });

    it('should not close modal when closeOnBackdrop is false', () => {
      const closeSpy = jest.fn();
      (component as any).close.subscribe(closeSpy);
      
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
      assignSignal('closeOnBackdrop', false);
      
      (component as any).onBackdropClick();
      
      expect(closeSpy).not.toHaveBeenCalled();
    });
  });
});

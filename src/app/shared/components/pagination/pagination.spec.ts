import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pagination } from './pagination';

describe('Pagination', () => {
  let component: Pagination;
  let fixture: ComponentFixture<Pagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pagination]
    }).compileComponents();

    fixture = TestBed.createComponent(Pagination);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('computed properties', () => {
    it('should calculate hasPrev correctly', () => {
      fixture.componentRef.setInput('currentPage', 1);
      fixture.componentRef.setInput('totalPages', 5);
      fixture.detectChanges();
      expect(component['hasPrev']()).toBe(false);

      fixture.componentRef.setInput('currentPage', 2);
      fixture.detectChanges();
      expect(component['hasPrev']()).toBe(true);
    });

    it('should calculate hasNext correctly', () => {
      fixture.componentRef.setInput('totalPages', 5);
      fixture.componentRef.setInput('currentPage', 5);
      fixture.detectChanges();
      expect(component['hasNext']()).toBe(false);

      fixture.componentRef.setInput('currentPage', 4);
      fixture.detectChanges();
      expect(component['hasNext']()).toBe(true);
    });

    it('should generate correct visible pages', () => {
      fixture.componentRef.setInput('totalPages', 10);
      fixture.componentRef.setInput('currentPage', 5);
      fixture.detectChanges();
      
      const pages = component['visiblePages']();
      expect(pages).toEqual([3, 4, 5, 6, 7]);
    });

    it('should handle first page range', () => {
      fixture.componentRef.setInput('totalPages', 10);
      fixture.componentRef.setInput('currentPage', 1);
      fixture.detectChanges();
      
      const pages = component['visiblePages']();
      expect(pages).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle last page range', () => {
      fixture.componentRef.setInput('totalPages', 10);
      fixture.componentRef.setInput('currentPage', 10);
      fixture.detectChanges();
      
      const pages = component['visiblePages']();
      expect(pages).toEqual([6, 7, 8, 9, 10]);
    });

    it('should handle fewer than 5 total pages', () => {
      fixture.componentRef.setInput('totalPages', 3);
      fixture.componentRef.setInput('currentPage', 2);
      fixture.detectChanges();
      
      const pages = component['visiblePages']();
      expect(pages).toEqual([1, 2, 3]);
    });
  });

  describe('onPageChange', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('totalPages', 10);
      fixture.componentRef.setInput('currentPage', 5);
      fixture.detectChanges();
    });

    it('should emit page change for valid page', () => {
      let emittedPage = 0;
      component.pageChange.subscribe((page: number) => emittedPage = page);
      
      component['onPageChange'](7);
      expect(emittedPage).toBe(7);
    });

    it('should not emit for invalid page (too low)', () => {
      let emittedPage = 0;
      component.pageChange.subscribe((page: number) => emittedPage = page);
      
      component['onPageChange'](0);
      expect(emittedPage).toBe(0);
    });

    it('should not emit for invalid page (too high)', () => {
      let emittedPage = 0;
      component.pageChange.subscribe((page: number) => emittedPage = page);
      
      component['onPageChange'](11);
      expect(emittedPage).toBe(0);
    });

    it('should not emit for current page', () => {
      let emittedPage = 0;
      component.pageChange.subscribe((page: number) => emittedPage = page);
      
      component['onPageChange'](5);
      expect(emittedPage).toBe(0);
    });

    it('should blur button after click', () => {
      const button = document.createElement('button');
      const mockEvent = { target: button } as unknown as Event;
      
      spyOn(button, 'blur');
      
      component['onPageChange'](7, mockEvent);
      expect(button.blur).toHaveBeenCalled();
    });
  });
});

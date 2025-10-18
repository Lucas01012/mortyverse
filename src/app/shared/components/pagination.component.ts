import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="pagination" *ngIf="totalPages > 1" aria-label="Pagination">
      <button 
        class="pagination__btn pagination__btn--prev"
        [disabled]="currentPage === 1"
        (click)="onPageChange(currentPage - 1)"
        aria-label="Previous page"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        <span class="pagination__btn-text">Prev</span>
      </button>
      
      <div class="pagination__pages">
        <!-- First page -->
        <button 
          *ngIf="showFirstPage"
          class="pagination__page"
          [class.pagination__page--active]="currentPage === 1"
          (click)="onPageChange(1)"
          [attr.aria-current]="currentPage === 1 ? 'page' : null"
        >
          1
        </button>
        
        <!-- First ellipsis -->
        <span class="pagination__ellipsis" *ngIf="showFirstEllipsis">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="6" cy="12" r="2"/>
            <circle cx="12" cy="12" r="2"/>
            <circle cx="18" cy="12" r="2"/>
          </svg>
        </span>
        
        <!-- Page numbers -->
        <button 
          *ngFor="let page of visiblePages"
          class="pagination__page"
          [class.pagination__page--active]="currentPage === page"
          (click)="onPageChange(page)"
          [attr.aria-current]="currentPage === page ? 'page' : null"
        >
          {{ page }}
        </button>
        
        <!-- Last ellipsis -->
        <span class="pagination__ellipsis" *ngIf="showLastEllipsis">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="6" cy="12" r="2"/>
            <circle cx="12" cy="12" r="2"/>
            <circle cx="18" cy="12" r="2"/>
          </svg>
        </span>
        
        <!-- Last page -->
        <button 
          *ngIf="showLastPage"
          class="pagination__page"
          [class.pagination__page--active]="currentPage === totalPages"
          (click)="onPageChange(totalPages)"
          [attr.aria-current]="currentPage === totalPages ? 'page' : null"
        >
          {{ totalPages }}
        </button>
      </div>
      
      <button 
        class="pagination__btn pagination__btn--next"
        [disabled]="currentPage === totalPages"
        (click)="onPageChange(currentPage + 1)"
        aria-label="Next page"
      >
        <span class="pagination__btn-text">Next</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
      
      <div class="pagination__info">
        <span class="pagination__current">Page {{ currentPage }}</span>
        <span class="pagination__separator">of</span>
        <span class="pagination__total">{{ totalPages }}</span>
      </div>
    </nav>
  `,
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() maxVisiblePages = 5;
  
  @Output() pageChange = new EventEmitter<number>();
  
  get visiblePages(): number[] {
    const pages: number[] = [];
    const half = Math.floor(this.maxVisiblePages / 2);
    
    let start = Math.max(2, this.currentPage - half);
    let end = Math.min(this.totalPages - 1, this.currentPage + half);
    
    // Adjust if we're near the start
    if (this.currentPage <= half) {
      end = Math.min(this.totalPages - 1, this.maxVisiblePages);
    }
    
    // Adjust if we're near the end
    if (this.currentPage >= this.totalPages - half) {
      start = Math.max(2, this.totalPages - this.maxVisiblePages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }
  
  get showFirstPage(): boolean {
    return this.totalPages > 1;
  }
  
  get showLastPage(): boolean {
    return this.totalPages > 1;
  }
  
  get showFirstEllipsis(): boolean {
    return this.visiblePages.length > 0 && this.visiblePages[0] > 2;
  }
  
  get showLastEllipsis(): boolean {
    return this.visiblePages.length > 0 && this.visiblePages[this.visiblePages.length - 1] < this.totalPages - 1;
  }
  
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}

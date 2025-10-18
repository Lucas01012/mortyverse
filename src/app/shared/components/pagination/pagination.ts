import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss'
})
export class Pagination {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  maxVisiblePages = input<number>(5);

  pageChange = output<number>();

  protected hasPrev = computed(() => this.currentPage() > 1);
  protected hasNext = computed(() => this.currentPage() < this.totalPages());
  
  protected visiblePages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const max = this.maxVisiblePages();
    const pages: number[] = [];

    if (total <= max) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, current - Math.floor(max / 2));
      let end = Math.min(total, start + max - 1);

      if (end === total) {
        start = Math.max(1, end - max + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  });

  protected onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }
}

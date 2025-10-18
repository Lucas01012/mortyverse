import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBar {
  searchTerm = input<string>('');
  statusFilter = input<string>('');
  genderFilter = input<string>('');

  searchChange = output<string>();
  statusChange = output<string>();
  genderChange = output<string>();

  protected onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }

  protected onStatusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.statusChange.emit(value);
  }

  protected onGenderChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.genderChange.emit(value);
  }

  protected onClear(): void {
    this.searchChange.emit('');
  }
}

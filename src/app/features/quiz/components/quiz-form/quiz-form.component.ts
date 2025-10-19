import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface QuizFilters {
  status?: string;
  species?: string;
  gender?: string;
}

@Component({
  selector: 'app-quiz-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizForm {
  submitFilters = output<QuizFilters>();

  selectedStatus = signal<string>('');
  selectedSpecies = signal<string>('');
  selectedGender = signal<string>('');

  statusOptions = [
    { value: '', label: 'Qualquer' },
    { value: 'Alive', label: 'Vivo' },
    { value: 'Dead', label: 'Morto' },
    { value: 'unknown', label: 'Desconhecido' }
  ];

  speciesOptions = [
    { value: '', label: 'Qualquer' },
    { value: 'Human', label: 'Humano' },
    { value: 'Alien', label: 'Alienígena' },
    { value: 'Humanoid', label: 'Humanóide' },
    { value: 'Robot', label: 'Robô' },
    { value: 'Cronenberg', label: 'Cronenberg' },
    { value: 'Animal', label: 'Animal' },
    { value: 'Poopybutthole', label: 'Poopybutthole' },
    { value: 'Mythological Creature', label: 'Criatura Mitológica' }
  ];

  genderOptions = [
    { value: '', label: 'Qualquer' },
    { value: 'Male', label: 'Masculino' },
    { value: 'Female', label: 'Feminino' },
    { value: 'Genderless', label: 'Sem gênero' },
    { value: 'unknown', label: 'Desconhecido' }
  ];

  onSubmit(): void {
    const filters: QuizFilters = {};
    
    if (this.selectedStatus()) {
      filters.status = this.selectedStatus();
    }
    if (this.selectedSpecies()) {
      filters.species = this.selectedSpecies();
    }
    if (this.selectedGender()) {
      filters.gender = this.selectedGender();
    }

    this.submitFilters.emit(filters);
  }

  onReset(): void {
    this.selectedStatus.set('');
    this.selectedSpecies.set('');
    this.selectedGender.set('');
  }
}

import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface QuizFilters {
  status?: string;
  species?: string;
  gender?: string;
  type?: string;
}

@Component({
  selector: 'app-quiz-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizForm {
  // Outputs
  submitFilters = output<QuizFilters>();

  // Form fields signals
  selectedStatus = signal<string>('');
  selectedSpecies = signal<string>('');
  selectedGender = signal<string>('');
  selectedType = signal<string>('');

  // Opções disponíveis
  statusOptions = [
    { value: '', label: 'Qualquer' },
    { value: 'alive', label: 'Vivo' },
    { value: 'dead', label: 'Morto' },
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
    { value: 'Mythological Creature', label: 'Criatura Mitológica' }
  ];

  genderOptions = [
    { value: '', label: 'Qualquer' },
    { value: 'Male', label: 'Masculino' },
    { value: 'Female', label: 'Feminino' },
    { value: 'Genderless', label: 'Sem gênero' },
    { value: 'unknown', label: 'Desconhecido' }
  ];

  typeOptions = [
    { value: '', label: 'Qualquer' },
    { value: 'Human with antennae', label: 'Humano com antenas' },
    { value: 'Parasite', label: 'Parasita' },
    { value: 'Cat', label: 'Gato' },
    { value: 'Dog', label: 'Cachorro' }
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
    if (this.selectedType()) {
      filters.type = this.selectedType();
    }

    this.submitFilters.emit(filters);
  }

  onReset(): void {
    this.selectedStatus.set('');
    this.selectedSpecies.set('');
    this.selectedGender.set('');
    this.selectedType.set('');
  }
}

import { Routes } from '@angular/router';
import { CharacterExplorerPage } from './features/character-explorer/pages/character-explorer-page/character-explorer-page.component';

export const routes: Routes = [
  {
    path: '',
    component: CharacterExplorerPage,
    title: 'Explorar Personagens | Mortyverse'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

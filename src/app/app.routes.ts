import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/character-explorer/pages/character-explorer-page/character-explorer-page.component')
      .then(m => m.CharacterExplorerPage),
    title: 'Explorar Personagens | Mortyverse'
  },
  {
    path: 'my-lists',
    loadComponent: () => import('./features/my-lists/pages/my-lists-page.component')
      .then(m => m.MyListsPage),
    title: 'Minhas Listas | Mortyverse'
  },
  {
    path: 'my-lists/:id',
    loadComponent: () => import('./features/my-lists/pages/list-detail-page.component')
      .then(m => m.ListDetailPage),
    title: 'Detalhes da Lista | Mortyverse'
  },
  {
    path: 'quiz',
    loadComponent: () => import('./features/quiz/pages/quiz-page.component')
      .then(m => m.QuizPage),
    title: 'Quiz de Personalidade | Mortyverse'
  },
  {
    path: 'guess-quiz',
    loadComponent: () => import('./features/quiz/pages/guess-quiz-page.component')
      .then(m => m.GuessQuizPage),
    title: 'Quiz de Adivinhação | Mortyverse'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

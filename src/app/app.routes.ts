import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'characters' },
	{
		path: 'characters',
		loadComponent: () =>
			import('./features/character-explorer/pages/character-list-page.component').then(
				(m) => m.CharacterListPageComponent
			),
	},
	{
		path: 'lists',
		loadComponent: () =>
			import('./features/my-lists/pages/my-lists-page.component').then(
				(m) => m.MyListsPageComponent
			),
	},
	{
		path: 'quiz',
		loadComponent: () =>
			import('./features/quiz/pages/quiz-page.component').then((m) => m.QuizPageComponent),
	},
	{ path: '**', redirectTo: 'characters' },
];

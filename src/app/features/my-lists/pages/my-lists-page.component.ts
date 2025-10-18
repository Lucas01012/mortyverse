import { Component } from '@angular/core';
import { ListManager } from '../components/list-manager/list-manager';

@Component({
  selector: 'app-my-lists-page',
  imports: [ListManager],
  templateUrl: './my-lists-page.component.html',
  styleUrl: './my-lists-page.component.scss'
})
export class MyListsPage {}

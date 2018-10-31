import { Component } from '@angular/core';

@Component({
  template:  `
    <h2>Questions</h2>
    <nav>
    <a routerLink="tags" routerLinkActive="active">tag</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class QuestionsComponent { }
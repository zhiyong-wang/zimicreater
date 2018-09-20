import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {QuestionsComponent} from './questions.component';
import { QuestionEditComponent } from './question-edit/question-edit.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { TagsComponent } from './tags/tags.component';
import {QuestionsRoutingModule} from './questions.routing';


@NgModule({
  imports: [
    CommonModule,
    QuestionsRoutingModule
  ],
  declarations: [
  QuestionsComponent,
  QuestionEditComponent, 
  QuestionListComponent, 
  TagsComponent]
})
export class QuestionsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { QuestionsComponent} from './questions.component';
import { QuestionEditComponent } from './question-edit/question-edit.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { TagsComponent } from './tags/tags.component';
import { QuestionsRoutingModule} from './questions.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule ,
    QuestionsRoutingModule
  ],
  declarations: [
  QuestionsComponent,
  QuestionEditComponent, 
  QuestionListComponent, 
  TagsComponent],
  providers: [

  ],
  
})
export class QuestionsModule { }

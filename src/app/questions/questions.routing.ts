import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionsComponent }           from './questions.component';
import { QuestionListComponent }        from './question-list/question-list.component';
import { QuestionEditComponent }        from './question-edit/question-edit.component';
import { TagsComponent }                from './tags/tags.component';


const questionsRoutes: Routes = [
  {
    path: 'questions',
    component: QuestionsComponent,
    children: [
      {path:'tags',component:TagsComponent,
      },
      {
        path: 'wordItems',
        component: QuestionListComponent,
        children: [
          { path: ':id',
            component:QuestionEditComponent,
          },
          { path: '',
            component:QuestionEditComponent,
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(questionsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class QuestionsRoutingModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { QuestionsComponent} from './questions.component';
import { QuestionEditComponent } from './question-edit/question-edit.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { TagsComponent } from './tags/tags.component';
import { QuestionsRoutingModule} from './questions.routing';
import { TagListComponent } from './tag-list/tag-list.component';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QuestionsRoutingModule,
    NgZorroAntdModule,
     BrowserAnimationsModule
  ],
  declarations: [
  QuestionsComponent,
  QuestionEditComponent, 
  QuestionListComponent, 
  TagsComponent, 
  TagListComponent],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }

  ],
  
})
export class QuestionsModule { }

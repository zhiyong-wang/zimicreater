import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { HttpClientModule } from '@angular/common/http';
import { AppRotingModule } from './app-roting.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import {TianziCreaterModule } from './tianzi-creater/tianzi-creater.module'
import {QuestionsModule } from './questions/questions.module'




@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule, 
    QuestionsModule,
    TianziCreaterModule,    
    AppRotingModule,
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

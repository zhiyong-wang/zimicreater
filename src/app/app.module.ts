import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { HttpClientModule } from '@angular/common/http';
import { AppRotingModule } from './app-roting.module';

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
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

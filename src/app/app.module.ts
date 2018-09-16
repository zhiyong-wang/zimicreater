import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { HttpClientModule } from '@angular/common/http';

import { InMemoryDataService }  from './in-memory-data.service';


import { AppRotingModule } from './/app-roting.module';

import { AppComponent } from './app.component';
import { ZimiComponent } from './zimi/zimi.component';
import { ZimiDetailComponent } from './zimi-detail/zimi-detail.component';
import { ZimiService } from './zimi.service';
import { ZimiListComponent } from './zimi-list/zimi-list.component';
import { ZimiGridsComponent } from './zimi-grids/zimi-grids.component';
import { ZimiCreatComponent } from './zimi-creat/zimi-creat.component';
import { TianziListComponent } from './tianzi-list/tianzi-list.component';



@NgModule({
  declarations: [
    AppComponent,
    ZimiComponent,
    ZimiDetailComponent,
    ZimiListComponent,
    ZimiGridsComponent,
    ZimiCreatComponent,
    TianziListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    AppRotingModule,
  ],
  providers: [
    ZimiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

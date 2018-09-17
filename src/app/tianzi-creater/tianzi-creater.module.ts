import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ZimiDetailComponent } from './zimi-detail/zimi-detail.component';
import { ZimiService } from './zimi.service';
import { ZimiListComponent } from './zimi-list/zimi-list.component';
import { ZimiGridsComponent } from './zimi-grids/zimi-grids.component';
import { ZimiCreatComponent } from './zimi-creat/zimi-creat.component';
import { TianziListComponent } from './tianzi-list/tianzi-list.component';


@NgModule({
  imports: [
    CommonModule，
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    
  ],


  declarations: [
    ZimiDetailComponent,
    ZimiListComponent,
    ZimiGridsComponent,
    ZimiCreatComponent,
    TianziListComponent,
  ],

  providers: [
    ZimiService,
  ]

})
export class TianziCreaterModule { }
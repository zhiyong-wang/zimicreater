import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZimiComponent }      from './zimi/zimi.component';
import { ZimiCreatComponent }      from './zimi-creat/zimi-creat.component';
const routes: Routes = [
   { path: 'zimi-creat', component: ZimiCreatComponent},
   { path: '', redirectTo: '/zimi-creat', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]

})
export class AppRotingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZimiCreatComponent }      from './tianzi-creater/zimi-creat/zimi-creat.component';
const routes: Routes = [
   { path: 'tianzicreater', component: ZimiCreatComponent},
   { path: '', redirectTo: '/tianzicreater', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]

})
export class AppRotingModule { }

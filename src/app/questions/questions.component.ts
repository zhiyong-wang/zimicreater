import { Component } from '@angular/core';

@Component({
  template:  `
   <nz-content style="padding:0 50px;">
	
	<nz-breadcrumb style="margin:16px 0;">
	  <nz-breadcrumb-item>Home</nz-breadcrumb-item>
	  <nz-breadcrumb-item routerLink="tags" routerLinkActive="active">tag</nz-breadcrumb-item>
	</nz-breadcrumb>
	<router-outlet></router-outlet>

	<nz-footer style="text-align: center;">Ant Design ©2017 Implement By Angular</nz-footer>


	</nz-content>    
  `
})
export class QuestionsComponent { }





 
import { Component, OnInit } from '@angular/core';
import { Zimi } from '../zimi';
import { Grid } from '../grid';

import { ZimiService} from '../zimi.service';

@Component({
  selector: 'app-zimi',
  templateUrl: './zimi.component.html',
  styleUrls: ['./zimi.component.css']
})
export class ZimiComponent implements OnInit {
  
   zimis :any[]=[];
   grids :Grid[]=[];
   //从服务处取得字谜列表，分别为横向字谜，纵向字谜，和网格词组
   getZimis(): void {
		
   }

   selectedZimi: Zimi;

   selectZimi(zimi: Zimi){
      this.selectedZimi = zimi;
     // for(let i=zimi.zb;i<zimi.zb+zimi.midi_length;i++){
     //   if()
      //}


    };

   // changeGrids(grids){
   //   this.grids=grids;
 //   }

  constructor(private zimiService:ZimiService) {
   }

  ngOnInit() {
  	this.getZimis();    
  }

}

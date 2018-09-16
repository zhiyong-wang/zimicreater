import { Component, EventEmitter, OnInit ,Input,Output} from '@angular/core';
import { Grid } from '../grid';


@Component({
  selector: 'app-zimi-grids',
  templateUrl: './zimi-grids.component.html',
  styleUrls: ['./zimi-grids.component.css']
})
export class ZimiGridsComponent implements OnInit {
    
    @Input() grids: Grid[];
    @Input() canChange: boolean;
    @Input() selectedGrids: number[];
    @Output() selectGrid =new EventEmitter<Grid>();
    @Output() selectZimi =new EventEmitter<number>();

    select_grid(grid:Grid){
     if(this.canChange){
      this.selectGrid.emit(grid);
      }
      else{
      	let zimi_index:number;
      	if(grid.zimi_h!=-1||grid.zimi_z!=-1){
      		zimi_index=(grid.zimi_h!=-1?grid.zimi_h:grid.zimi_z)
      		this.selectZimi.emit(zimi_index)
      	}
       
        }
      } 
  



    constructor() {};
    ngOnInit() {
    	
    }
}

import { Component, EventEmitter, Input,Output, OnChanges } from '@angular/core';
import { Zimi } from '../zimi';
import {Grid} from '../grid';

@Component({
  selector: 'app-zimi-detail',
  templateUrl: './zimi-detail.component.html',
  styleUrls: ['./zimi-detail.component.css']
})
export class ZimiDetailComponent implements OnChanges {

  @Input() zimi: Zimi;
  @Input() grids: Grid[];
  @Output() changeGrid =new EventEmitter<string>();


  midi:any[]=[]
  errer_message:string=''
  midi_rate:number=1
  midi_tooltips = [ 'terrible', 'bad', 'normal', 'good', 'wonderful' ]
  question_rate:number=1
  question_tooltips = [ 'terrible', 'bad', 'normal', 'good', 'wonderful' ]  

  onKey(){
    let midi_value=""
    for(let i=0;i<this.zimi.midi_length;i++){
         midi_value=midi_value+this.midi[i].nr
      }
   
   	if(midi_value.length==this.zimi.midi_length){
        this.changeGrid.emit(midi_value)
        this.errer_message=''
       }
    else{
     	this.errer_message='此项谜题谜底字数'
        this.changeGrid.emit("")
     } 

    }
    trackByI(index: number, item: string): number 
    { return index; }



  ngOnChanges() {
      this.midi=[]
      if (this.zimi){       
        if(this.zimi.midi==""){
          
          for(let i=0;i<this.zimi.midi_length;i++){
              let v=this.grids[this.zimi.zb+(this.zimi.zongheng==1?i:i*10)].value
              if(v){ this.midi[i]={"nr":v,"canchange":false}}
                else {this.midi[i]={"nr":"","canchange":true}}
           }           
         }
        else{
          for(let i=0;i<this.zimi.midi.split("").length;i++) {
             let v=this.grids[this.zimi.zb+(this.zimi.zongheng==1?i:i*10)]
               this.midi[i]=(this.grid_canchange(v)?{"nr":this.zimi.midi.charAt(i),"canchange":true}:{"nr":this.zimi.midi.charAt(i),"canchange":false})  
             }       }

  }
  }
  grid_canchange(grid:Grid):boolean{       
      if(this.zimi.zongheng==1){
          if(grid.zimi_z==-1){return true} 
            else{ if(this.grids[grid.id-10] && this.grids[grid.id-10].value){return false}
                    else{ if(this.grids[grid.id+10] && this.grids[grid.id+10].value){return false}
                          else{ return true}
                        }
                }
           }
      else{if(grid.zimi_h==-1){return true} 
            else{ if(this.grids[grid.id-1] && this.grids[grid.id-1].value){return false}
                    else{ if(this.grids[grid.id+1] && this.grids[grid.id+1].value){return false}
                          else{ return true}
                        }
                }

           }
  }


  constructor() {}

 

}

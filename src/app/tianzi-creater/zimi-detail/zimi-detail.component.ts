import { Component, EventEmitter, Input,Output, OnChanges } from '@angular/core';
import { Zimi } from '../zimi';
import {Grid} from '../grid';


const difficulty_rate=[1,1.4,1.8,2.2,2.6]
const clarity_rate=[1,1.2,1.4]
@Component({
  selector: 'app-zimi-detail',
  templateUrl: './zimi-detail.component.html',
  styleUrls: ['./zimi-detail.component.css']
})
export class ZimiDetailComponent implements OnChanges {

  @Input() zimi: Zimi;
  @Input() grids: Grid[];
  @Output() changeGrid =new EventEmitter<string>();
  @Output() setSearchItem =new EventEmitter<string[]>();
  @Output() setmidi =new EventEmitter<string>();

  midi:any[]=[]

  errer_message:string=''
  midi_rate:number=1
  midi_tooltips = [ '小学低年级', '小学高年级', '初中', '高中', '大学' ]
  question_rate:number=1
  question_tooltips = [ '特别明确', '有清晰提示', '模糊' ]  

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
     	this.errer_message='此项谜题谜底字数不符'
     } 

    }

   clean(){
     this.zimi.question=''
     this.zimi.answer=''
     this.changeGrid.emit('')
     this.ngOnChanges()

   }


    trackByI(index: number, item: string): number 
    { return index; }


    searchItem:string[]


  ngOnChanges() {
     let searchItem:string[]=[]
      this.midi=[]
      if (this.zimi){ 
        if(this.zimi.midi.length<this.zimi.midi_length){this.zimi.midi=""}      
        if(this.zimi.midi==""){
          
          for(let i=0;i<this.zimi.midi_length;i++){
              let v=this.grids[this.zimi.zb+(this.zimi.zongheng==1?i:i*10)].value
              if(v){ this.midi[i]={"nr":v,"canchange":false};searchItem[i]=v}
                else {this.midi[i]={"nr":"","canchange":true};searchItem[i]=""}             
           } 
           
          
         }
        else{
          for(let i=0;i<this.zimi.midi_length;i++) {
             let v=this.grids[this.zimi.zb+(this.zimi.zongheng==1?i:i*10)]
               this.midi[i]=(this.grid_canchange(v)?{"nr":this.zimi.midi.charAt(i),"canchange":true}:{"nr":this.zimi.midi.charAt(i),"canchange":false}) 
               searchItem[i]=(this.grid_canchange(v)?"":this.zimi.midi.charAt(i))  
             }       }
         this.searchItem=searchItem
         this.setSearchItem.emit(searchItem)
         this.setmidi.emit(this.zimi.midi)

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

  setItem(item:string):void{
    for(let i in this.midi){
      if (this.midi[i].canchange){
        this.midi[i].nr=item.charAt(Number(i))
      }
    }
  }


  constructor() {}

 

}

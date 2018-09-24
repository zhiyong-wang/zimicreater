import { Component, EventEmitter,OnInit, Input,Output } from '@angular/core';
import { Zimi } from '../zimi';

@Component({
  selector: 'app-zimi-detail',
  templateUrl: './zimi-detail.component.html',
  styleUrls: ['./zimi-detail.component.css']
})
export class ZimiDetailComponent implements OnInit {
  
  @Input() zimi: Zimi;
  @Output() changeGrid =new EventEmitter<string>();
  errer_message:string=''


  onKey(value: string){
  	let thisvalue=value.replace(/\s+/g,'')
  	if(thisvalue.length==this.zimi.midi_length){
        this.changeGrid.emit(thisvalue);
        this.errer_message=''
       }
    else{
     	this.errer_message='此项谜题谜底字数'
        this.changeGrid.emit("");
     }

}
  constructor() { }

  ngOnInit() {}


  }



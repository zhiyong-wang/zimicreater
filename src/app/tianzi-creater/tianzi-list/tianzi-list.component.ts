import { Component, EventEmitter, OnInit ,Input,Output} from '@angular/core';

@Component({
  selector: 'app-tianzi-list',
  templateUrl: './tianzi-list.component.html',
  styleUrls: ['./tianzi-list.component.css']
})
export class TianziListComponent implements OnInit {
    
    @Input() tianzis:any[]; 
    @Input() source:string; 
    @Output() selectTianzi =new EventEmitter<{}>();

    
    onSelect(tianzi_id:number){
          let thing={"source":this.source,"id":tianzi_id}
      		this.selectTianzi.emit(thing)
      } 


  constructor() {}

  ngOnInit() { 
  }

}

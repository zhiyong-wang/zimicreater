import { Component, EventEmitter, OnInit ,Input,Output} from '@angular/core';

@Component({
  selector: 'app-tianzi-list',
  templateUrl: './tianzi-list.component.html',
  styleUrls: ['./tianzi-list.component.css']
})
export class TianziListComponent implements OnInit {
    
    @Input() tianzis:any[];    
    @Output() selectTianzi =new EventEmitter<number>();


    onSelect(tianzi_id:number){
      		this.selectTianzi.emit(tianzi_id)
      } 


  constructor() {}

  ngOnInit() { 
  }

}

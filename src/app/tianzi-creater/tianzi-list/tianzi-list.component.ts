import { Component, EventEmitter, OnInit ,Input,Output} from '@angular/core';

@Component({
  selector: 'app-tianzi-list',
  templateUrl: './tianzi-list.component.html',
  styleUrls: ['./tianzi-list.component.css']
})
export class TianziListComponent implements OnInit {
    
    @Input() tianzis:{}; 
    @Input() source:string; 
    @Output() selectTianzi =new EventEmitter<{}>()
    @Output() selectPage =new EventEmitter<{}>()
    selectId:number;
    
    onSelect(tianzi_id:number){
          let thing={"source":this.source,"id":tianzi_id}
      		this.selectTianzi.emit(thing)
          this.selectId=tianzi_id
          this.tianzis['perid']=tianzi_id
      } 
    loadData(page:number):void{
      let thing={"source":this.source,"page":page}
      this.selectPage.emit(thing)

    }

  constructor() {}

  ngOnInit() { 
  }

}

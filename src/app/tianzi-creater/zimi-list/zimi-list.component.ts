import { Component,EventEmitter,OnInit ,Input,Output} from '@angular/core';
import { Zimi } from '../zimi';



@Component({
  selector: 'app-zimi-list',
  templateUrl: './zimi-list.component.html',
  styleUrls: ['./zimi-list.component.css']
})
export class ZimiListComponent implements OnInit {
   selectedZimi:Zimi;
   @Input() zimis: any[];
   @Output() selectZimi =new EventEmitter<Zimi>();

   difficulty_rate=[1,1.4,1.8,2.2,2.6]
clarity_rate=[1,1.2,1.4]

   onSelect(zimi: Zimi){
      this.selectZimi.emit(zimi);
      this.selectedZimi=zimi
    };
  constructor() { }

  ngOnInit() {
  }

}

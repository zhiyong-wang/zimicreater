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

   onSelect(zimi: Zimi){
      this.selectZimi.emit(zimi);
      this.selectedZimi=zimi
    };
  constructor() { }

  ngOnInit() {
  }

}

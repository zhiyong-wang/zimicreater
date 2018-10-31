import { Component, OnInit,Output,EventEmitter, } from '@angular/core';
import { QuestionService } from '../question.service'
import { Observable,of,from} from 'rxjs';
import {Tag} from '../WordItem'

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {

  tags:Tag[];
  selectedTag:Tag;
 @Output() selectTag =new EventEmitter<Tag>();

   onSelect(tag:Tag){
      this.selectTag.emit(tag);
      this.selectedTag=tag
    };
  gettags():void{
	  this.service.gettags().subscribe(tags=>{
      this.tags=tags["data"];       
     })
     }

  constructor(    
  	private service: QuestionService) { }

  ngOnInit() {
  	this.gettags();
  }

}

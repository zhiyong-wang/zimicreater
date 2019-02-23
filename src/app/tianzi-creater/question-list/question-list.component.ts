import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { QuestionService } from '../../questions/question.service'
import {WordItem,Tag} from '../../questions/WordItem';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
   wordItems: WordItem[];
   wordItem:WordItem;
   tags:Tag[];
   selectedTags:number[];


   getwordItems(tags:String):void{
	  this.service.getwordItems(tags).subscribe(questions=>{
      this.wordItems=questions["data"];
     })
 
}
  gettags():void{
    this.service.gettags().subscribe(tags=>{
      this.tags=tags["data"];       
     })
     }
 handleChange(checked: boolean, tag: Tag): void {
    if (checked) {
      this.selectedTags.push(tag.tag_id);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag.tag_id);
    }
    this.selectedTags.sort((a,b)=>{return a - b})
    this.getwordItems(this.selectedTags.join())
    }


  constructor(
    private service: QuestionService)
  {}

  ngOnInit() {
  	this.getwordItems('');
    this.gettags();
    this.selectedTags=[];
  	
  }

}

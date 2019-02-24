import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WordItem } from '../WordItem';
import { QuestionService } from '../question.service'
import {Tag} from '../WordItem';

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
   peritem:number=10;
  item_total:number;

   getwordItems(tags:string,page:number):void{
	  this.service.getwordItems(tags,page,this.peritem).subscribe(questions=>{
      this.wordItems=questions["data"].question_list;
      this.item_total=questions["data"].question_count;
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
    this.getwordItems(this.selectedTags.join(),1)
    }
  loadData(page:number):void{
      this.getwordItems(this.selectedTags.join(),page)

    }  


  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private service: QuestionService)
  {}

  ngOnInit() {
  	this.getwordItems('',1);
    this.gettags();
    this.selectedTags=[];
  	
  }

}

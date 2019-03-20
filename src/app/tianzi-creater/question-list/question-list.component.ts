

import { Component, EventEmitter,  OnInit,Input,Output } from '@angular/core';
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


   searchItem: string[]=[];

   wordItems: WordItem[];
   tags:Tag[];
   selectedTags:number[];
   item_count:number=7;
   item_total:number;
   @Output() sentItem =new EventEmitter<string>();

   getwordItems(tags:string,page:number,searchItem:string[]):void{
	  this.service.getwordItems(tags,page,this.item_count,searchItem).subscribe(questions=>{
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
    this.getwordItems(this.selectedTags.join(),1,this.searchItem)
    }

    loadData(page:number):void{
      this.getwordItems(this.selectedTags.join(),page,this.searchItem)


    }



  Changes(searchItem:string[]):void {
this.getwordItems(this.selectedTags.join(),1,searchItem)
      this.searchItem=searchItem
  }

clickItem(midi:string):void{

   this.sentItem.emit(midi)


}


  constructor(
    private service: QuestionService)
  {}

  ngOnInit() {


    this.getwordItems('',1,[]);
    this.gettags();
   this.selectedTags=[];
    
  }




}

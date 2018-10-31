  import { Component, OnInit,Input } from '@angular/core';
import { QuestionService } from '../question.service'
import { Observable,of,from} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {Tag} from '../WordItem'

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tag:Tag={tag_id:null,tag_title:""};
  errer_message:string=''; 
  selectedTag:Tag=null;

  @Input() selectId:string

  onKey():void{
       this.tag.tag_title=this.tag.tag_title.replace(/\s+/g,'')                                    
     }
  
  selectTag(tag:Tag):void{
  	this.selectedTag=tag
  	this.tag=tag
  }

  add(): void {      
  	   if(this.tag.tag_title){
          this.service.addtag(this.tag)
             .subscribe(()=>{this.tag={tag_id:null,tag_title:null};
         location.reload();});
        }
        else{
          this.errer_message='必填'
        } 

   };

delete():void{ 

this.service.deletetag(this.selectedTag)
    .subscribe(()=>{this.cancel(); 
    				location.reload();})

}


   cancel():void{
   	this.tag={tag_id:null,tag_title:""}
    this.selectedTag=null
   }

  constructor(    
  	private service: QuestionService) { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable,of,from} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WordItem } from '../WordItem';
import { Tag } from '../WordItem';
import { QuestionService } from '../question.service'
@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {


  errer_message:string='';  
  wordItem$:Observable<WordItem>;
  wordItem:WordItem={question_id:-1,midi:'',question:'',answer:'',tags:null};
  selectedId:string;
  id:number;
  selectedTags:Tag[];
  tags:Tag[]

  onKey():void{
       this.wordItem.midi=this.wordItem.midi.replace(/\s+/g,'')                                    
       this.wordItem.question=this.wordItem.question.replace(/\s+/g,'')
       this.wordItem.answer= this.wordItem.answer.replace(/\s+/g,'')
     }
  add(): void {
       this.wordItem.tags=""  
       if (this.selectedTags.length>0){
         for (let tag of this.selectedTags){
               this.wordItem.tags=this.wordItem.tags+(String(tag.tag_id)) +',' 
           }
       }          
  	   if(this.wordItem.midi&&this.wordItem.question&&this.wordItem.answer){
          this.service.addwordItem(this.wordItem)
             .subscribe(()=>{this.cleanwordItem()});
        }
        else{
          this.errer_message='项目填全'
        } 
   };

   modify():void{       
       this.wordItem.tags=""  
       if (this.selectedTags.length>0){
         for (let tag of this.selectedTags){
               this.wordItem.tags=this.wordItem.tags+(String(tag.tag_id)) +',' 
           }
       }          
       if(this.wordItem.midi&&this.wordItem.question&&this.wordItem.answer){
          this.service.modifywordItem(this.wordItem)
             .subscribe(()=>{});
        }
        else{
          this.errer_message='项目填全'
        } 
   }
   delete():void{
       this.service.deletewordItem(this.wordItem)
             .subscribe(()=>{this.cleanwordItem()});

   }
  selectTag(tag:Tag):void{
    if (this.selectedTags.find((t)=>t.tag_id==tag.tag_id)){} 
    else    
      {this.selectedTags.push(tag);  }
  }
  unselectTag(tag:Tag):void{
     let i=this.selectedTags.findIndex((t)=>t==tag)
     this.selectedTags.splice(i,1)
  }

  cleanwordItem(): void {
       location.href="../questions/wordItems/"; 
   }

  setSelectedTag():void{
     this.selectedTags=[]
     if (!(this.wordItem.tags==null)){
       let a=this.wordItem.tags.split(",")
       for (let tagId of this.wordItem.tags.split(",")) {
           if (!this.selectedTags.find((t)=>t.tag_id==Number(tagId)))
             { this.selectedTags.push(this.tags.find((t)=>t.tag_id==Number(tagId)));}   }
      }
  
   }
  gettags():void{
    this.service.gettags().subscribe(tags=>{
      this.tags=tags["data"];       
     })
     }
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private service: QuestionService
   )  
    {}
 ngOnInit() {    
    this.gettags();
    this.selectedTags=[];
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>{
      this.selectedId=params.get('id')
      if(this.selectedId){return this.service.getwordItem(this.selectedId)}
      else{return of({'data':{ question_id:-1,midi:'qqq',question:'',answer:'',tags:null}})}
       }        
     )).subscribe(q=>{this.wordItem=q['data'];
                  this.setSelectedTag();}); 
     
   } 
     
}


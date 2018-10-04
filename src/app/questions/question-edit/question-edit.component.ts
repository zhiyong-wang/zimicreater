import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable,of,from} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WordItem } from '../WordItem';
import { QuestionService } from '../question.service'
@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {


  errer_message:string='';  
  wordItem$:Observable<WordItem>;
  wordItem:WordItem={question_id:-1,midi:'',question:'',answer:''};
  selectedId:string;
  id:number;
  onKey():void{
       this.wordItem.midi=this.wordItem.midi.replace(/\s+/g,'')                                    
       this.wordItem.question=this.wordItem.question.replace(/\s+/g,'')
       this.wordItem.answer= this.wordItem.answer.replace(/\s+/g,'')
     }
  add(): void {      
  	   if(this.wordItem.midi&&this.wordItem.question&&this.wordItem.answer){
          this.service.addwordItem(this.wordItem)
             .subscribe(()=>{this.cleanwordItem()});
        }
        else{
          this.errer_message='项目填全'
        } 

   };


   cleanwordItem(): void {
     this.wordItem={question_id:-1,midi:'',question:'',answer:''}; 
   }
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private service: QuestionService
   )  
    {}
 ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>{
      this.selectedId=params.get('id')
      if(this.selectedId){return this.service.getwordItem(this.selectedId)}
      else{return of({'data':{ question_id:-1,midi:'qqq',question:'',answer:''}})}
       }        
     )).subscribe(q=>this.wordItem=q['data']); 
     
   } 
     
}


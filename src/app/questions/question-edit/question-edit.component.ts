import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
  wordItem:WordItem={Midi:'000',Question:'',Answer:''};
  thismessage:string="null"
 

  onKey():void{
       this.wordItem.Midi=this.wordItem.Midi.replace(/\s+/g,'')                                    
       this.wordItem.Question=this.wordItem.Question.replace(/\s+/g,'')
       this.wordItem.Answer= this.wordItem.Answer.replace(/\s+/g,'')
     }
  add(): void {      
  	   if(this.wordItem.Midi&&this.wordItem.Question&&this.wordItem.Answer){
          this.service.addwordItem(this.wordItem)
             .subscribe(()=>{this.cleanwordItem()});
          this.thismessage="It is ok"
        }
        else{
          this.errer_message='项目填全'
        } 

   };
   cleanwordItem(): void {
     this.wordItem={Midi:'',Question:'',Answer:''}; 
   }




  constructor(

    private route:ActivatedRoute,
    private router:Router,
    private service: QuestionService
   )  
    {}

  ngOnInit() {    

}
}

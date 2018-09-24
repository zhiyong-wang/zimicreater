import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { WordItem } from '../WordItem';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {


  errer_message:string='';  
  wordItem:WordItem={Question_ID:-1,Midi:'000',Question:'',Answer:''};
  thismessage:string="null"
  
  add(): void {      
  	   if(this.wordItem.Midi&&this.wordItem.Question&&this.wordItem.Answer){
          // this.service.addWordItem(this.wordItem);
          this.thismessage="It is ok"
        }
        else{
          this.errer_message='项目填全'
        } 

   };
   onKey():void{
       this.wordItem.Midi=this.wordItem.Midi.replace(/\s+/g,'')                                    
       this.wordItem.Question=this.wordItem.Question.replace(/\s+/g,'')
       this.wordItem.Answer= this.wordItem.Answer.replace(/\s+/g,'')
     }

  constructor(

    private route:ActivatedRoute,
    private router:Router,
   // private service: QuestionService
   )  
    {}

  ngOnInit() {    

}
}

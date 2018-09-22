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


  errer_message:string='aa';
  
  wordItem:WordItem

  
  add(item: WordItem){
  	// item.Midi=item.Midi.replace(/\s+/g," ")                                    
  //	 item.Question=Qtem.question.replace(/\s+/g," ")
   //  item.Answer=item.Answer.replace(/\s+/g," ")
  	//if(item.Midi&item.Question&item.Answer){
        //this.service.addWordItem(item);
      // }
  //  else{
   //  	this.errer_message='项目填全'
    //    } 
    };
   onKey(value:string):void{}

  constructor(

    private route:ActivatedRoute,
    private router:Router,
   // private service: QuestionService
   )  
    {}

  ngOnInit() {    
   this.wordItem={Question:'',Answer:'',Midi:'000'};

}

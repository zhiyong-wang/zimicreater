import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WordItem } from '../WordItem';
import { QuestionService } from '../question.service'
@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
   wordItems: WordItem[];
   wordItem:WordItem;

   getwordItems():void{
	  this.service.getwordItems().subscribe(questions=>{
      this.wordItems=questions["data"];
     })
 
}

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private service: QuestionService)
  {}

  ngOnInit() {
  	this.getwordItems()
  	
  }

}

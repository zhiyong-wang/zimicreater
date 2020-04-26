import { Component, EventEmitter,  OnInit,Input,Output ,OnChanges} from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { QuestionService } from '../../questions/question.service'
import { WordItem,Tag} from '../../questions/WordItem';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit,OnChanges {

   searchItem: string[]=[];

   wordItems: WordItem[];
   tags:Tag[];
   selectedTags:number[];
   item_count:number=10;
   item_total:number;
   midi:string;
   @Output() sentItem =new EventEmitter<string>();


   @Input() zimis_tmp:any[];
   items_tmp:any[]

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
      this.selectfromTmp()
  }
  Changes_midi(midi:string):void{
    this.midi=midi

  }

 ngOnChanges() {
    this.items_tmp=this.zimis_tmp
    this.selectfromTmp()
 }

  selectfromTmp():void{
    if(this.searchItem.length==0)
    	   {console.log("0")  }
    else{console.log("1")
        	this.items_tmp=[]
				    	for (let item of this.zimis_tmp){
				    		  let tmp=true
				        if (this.searchItem.length==item.midi.length)
									      for(let i in this.searchItem){
									       if (this.searchItem[i]!=""&&this.searchItem[i]!=item.midi[i]){tmp=false}
									      }
									     else{tmp=false}
           
             if (tmp) {this.items_tmp.push(item)}
          }

    }

    let zditItem=this.searchItem.join("")
   //let item1=item.replace(/\?/g,'.{1,1}') 
   //let  patt=new RegExp(item1);


  }

clickItem(midi:string):void{
   this.sentItem.emit(midi)
}




//zdit
getnetItems(web:string){
    console.log(this.searchItem)
    let url
    for(let i in this.searchItem){
       if (this.searchItem[i]==""){this.searchItem[i]="?"}
    }
    let zditItem=this.searchItem.join("")
   //let item1=item.replace(/\?/g,'.{1,1}') 
   //let  patt=new RegExp(item1);
  // let url='/sousuo/?page='+1+'&q='+encodeURIComponent(item);    
   
   if(web=="baidu"){url='https://dict.baidu.com/s?wd='+encodeURIComponent(zditItem);}
   if(web=="guoxue"){
     let item=zditItem.replace('?',"_")
     url='http://www.guoxuedashi.com/zidian/so.php?sokeyci='+encodeURIComponent(item)+'&submit=&kz=13&cilen='+zditItem.length;}
   if(web=="wiki"){url='https://zh.wikipedia.org/zh/'+encodeURIComponent(zditItem);}
   window.open(url)
}
getnetMidi(web:string){
   
    let url
    let searchItem=this.midi

   if(web=="zdit"){url='https://www.zdic.net/e/sci/index.php?field=0&classid=8&keyboard='+encodeURIComponent(searchItem);}
   if(web=="google"){url='https://www.google.com/search?q='+encodeURIComponent(searchItem)}
   if(web=="baidu"){url='https://www.baidu.com/s?wd='+encodeURIComponent(searchItem);}
   if(web=="wiki"){url='https://zh.wikipedia.org/zh/'+encodeURIComponent(searchItem);}
   window.open(url)
}






  constructor(
    private service: QuestionService,
)
  {}

  ngOnInit() {

    this.getwordItems('',1,[]);
    this.gettags();
    this.selectedTags=[];
    
  }




}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Zimi } from '../zimi';
import { ZimiService} from '../zimi.service';
import {Grid} from '../grid';


@Component({
  selector: 'app-zimi-creat',
  templateUrl: './zimi-creat.component.html',
  styleUrls: ['./zimi-creat.component.css']
})
export class ZimiCreatComponent implements OnInit {
   zimis :any[]=[];
   grids:Grid[];
   selectedGrids:number[]=[];
   tianzis:any[]=[];
   tianzi_id:number=-1;
   canChange:boolean=false;  //字谜Grid是否能设置
   //从服务处取得字谜列表，分别为横向字谜，纵向字谜，和网格词组 
   source:string=""
   
   selectedZimi: Zimi;    

  //点击zimi-listd选择当前字谜进行编辑
  selectZimi(zimi: Zimi){
      this.selectedZimi = zimi;
      this.selectedGrids=[]
      if(zimi.zongheng==1){
	      for(let i=zimi.zb;i<zimi.zb+zimi.midi_length;i++){
	         this.selectedGrids.push(i)
	      }
	  }
      else{
	      for(let i=zimi.zb;i<zimi.zb+zimi.midi_length*10;i=i+10){
	         this.selectedGrids.push(i)
	      }
	  }
    };
   //点击grid通过grid的zimi_id选择当前字谜
    selectZimiindex(i:number){
      if(i<this.zimis[0].length){
      	this.selectZimi(this.zimis[0][i])}
      else{
      	this.selectZimi(this.zimis[1][i-this.zimis[0].length])
      }	
    }
   //设置grid同时改变字谜模板
   setZimis(grid:Grid){

      if (grid.value!=null){
      	grid.value=null
      	}
      else{grid.value=''
      	}
      this.zimiService.setZimis(this.grids).subscribe(zimis=>{
      this.zimis=zimis
      })

   }
//修改zimi
  updataGrid(newmidi:string){

   	   let zimi=this.selectedZimi
       if (zimi.zongheng==1){
       	  this.zimis[0][zimi.id].midi=newmidi
          for(let i=zimi.zb,j=0;i<zimi.midi.length+zimi.zb;i++,j++){
              this.grids[i].value=newmidi[j]
            }
           }
        else{
        	this.zimis[1][zimi.id-this.zimis[0].length].midi=newmidi
        	for(let i=zimi.zb,j=0;i<zimi.midi.length*10+zimi.zb;i=i+10,j++){
              this.grids[i].value=newmidi[j]
            }
        }
    }

//获得选择的tianzi
	getZimis(source:string,id:number): void {
    this.canChange=(source==""?true:false);
    this.selectedGrids=[]
	  this.zimiService.getZimis(source,id).subscribe(zimis=>{
      this.zimis[0]=zimis[1];
      this.zimis[1]=zimis[0];
      this.grids=zimis[2];}
     )
   }



//切换到临时tmp或正式https模式调出相应的字谜list
getTianzilist(source:string):void{
  this.source=source
  this.zimiService.getTianzi(source).subscribe(tianzis=>{
      this.tianzis=tianzis["data"];
     })
  this.selectTianzi(1)
}

//切换到createGRid模式
creatTianzi():void{
  this.source='';
  this.tianzis=[];
  this.grids=[];
  this.getZimis("",0);
}


//增加zimis到tmp
add(): void {
  let addzimis =[ ...this.zimis[0],...this.zimis[1]]
  if (!addzimis) { return; }
  this.zimiService.addZimis('tmp',addzimis)
    .subscribe(()=>{this.cleanGrid()})
}

//还原Grid
cleanGrid():void{
 for(let i=0;i<100;i++){
        this.grids[i]={
                        id:i,
                        value:null,
                        zimi_h:-1,
                        zimi_z:-1,
                           }         
        };
  this.zimis=[[],[]]
};
selectTianzi(id:number):void{
    this.tianzi_id=id
    this.getZimis(this.source,id)
}

save():void{
let modifyzimis =[ ...this.zimis[0],...this.zimis[1]]
let id=modifyzimis[0].zimi_id
this.zimiService.modifyZimisTemp(modifyzimis,this.tianzi_id)
    .subscribe(()=>{})
}  

cleanZimi():void{ 
   for(let zimi of this.zimis[0]){zimi['midi']="";zimi['question']="";zimi['answer']=""}
   for(let zimi of this.zimis[1]){zimi['midi']="";zimi['question']="";zimi['answer']=""}
   for(let grid of this.grids){if(grid['value']!=null){grid['value']=""}}
}
delete():void{ 

this.zimiService.deleteZimis(this.source,this.tianzi_id)
    .subscribe(()=>{this.getTianzilist(this.source)})

}

update():void{
   
  let addzimis =[ ...this.zimis[0],...this.zimis[1]]
  if (!addzimis) { return; }
  this.zimiService.addZimis('http',addzimis)
    .subscribe(()=>{this.getTianzilist('http')})


}

back():void{
  let addzimis =[ ...this.zimis[0],...this.zimis[1]]
  for (let zimi of addzimis){
     zimi.midi_length=zimi.midi.length
  }
  this.zimiService.addZimis('tmp',addzimis)
    .subscribe(()=>{this.delete()})


}

constructor(
  	private zimiService:ZimiService,
  	private route: ActivatedRoute,) {
}
  ngOnInit() {
    
 	this.creatTianzi(); 
  }

}

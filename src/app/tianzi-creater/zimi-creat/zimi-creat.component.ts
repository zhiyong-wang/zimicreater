import { Component, OnInit, ViewChild,Output,EventEmitter} from '@angular/core';
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
   tianzi_id:number=-1;
   canChange:boolean=false;  //字谜Grid是否能设置
   //从服务处取得字谜列表，分别为横向字谜，纵向字谜，和网格词组 
   source:string=""   
   selectedZimi: Zimi; 
   appearGrid_list=[]
   select_AppearModel:number
   disappear_grids=[]

   items_tmp:Zimi[]=[]; //questionlist暂存区条目

 

   saveIteminTmp(){
     this.items_tmp=[...this.zimis[0],...this.zimis[1]]
     console.log(this.items_tmp[0].midi)
   }

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
    console.log(this.selectedGrids)
    };
   //点击grid通过grid的zimi_id选择当前字谜
    selectZimiindex(i:number){
     if(i>=0){
     if(i<this.zimis[0].length){
      	this.selectZimi(this.zimis[0][i])}
      else{
      	this.selectZimi(this.zimis[1][i-this.zimis[0].length])
      }	}
    }
   //设置grid同时改变字谜模板
   setZimis(grid:Grid){

      if (grid.value!=null){
      	grid.value=null
      	}
      else{
        if(grid.appear){
        grid.value=''}
      	}
      this.zimiService.setZimis(this.grids).subscribe(zimis=>{
      this.zimis=zimis
      console.log(this.zimis)
      })

   }
   set_gridAppear(grid:Grid){
     if(grid.value==null){
     grid.appear=!grid.appear}
   }
   selectAppear(data:string){
     let disappear_grids=data.split(",")
     console.log(disappear_grids)
     for(let grid of this.grids){
      if(disappear_grids.includes(grid.id.toString())){
        grid.appear=false
        grid.value=null
     }
     else{ grid.appear=true}
    }

   }
   deleteAppear(id:number){
    var r = confirm("");
    if (r == true) {
       console.log(id);
       this.zimiService.delete_appearMOdel(id)
    .subscribe(()=>{this.getAppearGrids_list})
    } else {
        console.log("aaa")
    }
    
   }



//修改zimi
  updataGrid(newmidi:string){

   	   let zimi=this.selectedZimi
       if (zimi.zongheng==1){
       	  this.zimis[0][zimi.id].midi=newmidi
          for(let i=zimi.zb,j=0;i<zimi.midi_length+zimi.zb;i++,j++){
              if(newmidi!=""){this.grids[i].value=newmidi[j]}
                else{if(this.zimis[1][this.grids[i].zimi_z-this.zimis[0].length]&&this.zimis[1][this.grids[i].zimi_z-this.zimis[0].length].midi!=''){}
                     else{this.grids[i].value=''}
              }
            }
           }
        else{
        	this.zimis[1][zimi.id-this.zimis[0].length].midi=newmidi
        	for(let i=zimi.zb,j=0;i<zimi.midi_length*10+zimi.zb;i=i+10,j++){
              if(newmidi!=""){this.grids[i].value=newmidi[j]}
                else{if(this.zimis[0][this.grids[i].zimi_h]&&this.zimis[0][this.grids[i].zimi_h].value!=""){this.grids[i].value=newmidi[j]}
                     else{this.grids[i].value=""}
            }
        }
    }
  }

//获得选择的tianzi
	getZimis(source:string,id:number): void {
    this.canChange=(source=="tianzi_model"||source==""?true:false);
    this.selectedGrids=[]
	  this.zimiService.getZimis(source,id).subscribe(zimis=>{
      console.log(zimis)
      this.zimis[0]=zimis[1];
      this.zimis[1]=zimis[0];
      this.grids=zimis[2];


      for(let grid of this.grids){
        if(!grid.appear){
          this.disappear_grids.push(grid.id)
        }
      }
   
      console.log(this.zimis)

      }
     )
   }

  zimi_rate=0
  
  get_zimi_rate():void{this.zimi_rate
      console.log(this.zimis[0])
      this.zimi_rate=0
      for(let zimi of this.zimis[0]){
        this.zimi_rate=this.zimi_rate+(zimi.clarity*0.5+1.2)*(zimi.difficulty*0.2+1.1)
      }
      for(let zimi of this.zimis[1]){
        this.zimi_rate=this.zimi_rate+(zimi.clarity*0.5+1.2)*(zimi.difficulty*0.2+1.1)
        console.log(this.zimi_rate)
      }
      this.zimi_rate=Math.round(this.zimi_rate/(this.zimis[0].length+this.zimis[1].length)*1000)

  }
item_count:number=8
tianzilist:{}={"tianzi_model":{},
               "tianzi_tmp":{},
               "tianzi_http":{}}

//调出的字谜list
getTianzilist(source:string,page:number,item_count:number):void{
  this.zimiService.getTianzi(source,page,item_count).subscribe(tianzi=>{
      this.tianzilist[source]={list:tianzi["data"].tianzi_list,
                               perid:tianzi["data"].tianzi_id,
                               total:tianzi["data"].tianzi_count}
     })
 this.canChange=(source=="tianzi_model"||source==""?true:false);
}
geTianzilist_first(): void {
    for (const key in this.tianzilist) {
      this.getTianzilist(key,1,this.item_count)
      }
    }


  getAppearGrids_list():void{
    console.log("aaa")
    this.zimiService.getAppearGrids_list().subscribe(appearGrids=>{
        this.appearGrid_list=appearGrids["data"]
        console.log(this.appearGrid_list)
       })
  
  }

//切换到createGRid模式
creatTianzi():void{
  //this.source='';
  //this.tianzi=[];
  this.grids=[];
  this.getZimis("",0);
  this.getAppearGrids_list()
}


//还原Grid
cleanGrid():void{
 for(let i=0;i<100;i++){
        this.grids[i]={
                        id:i,
                        value:null,
                        zimi_h:-1,
                        zimi_z:-1,
                        appear:true
                           }         
        };
  this.zimis=[[],[]]
};
selectTianzi(tianzi:{}):void{
    this.source=tianzi["source"]
    this.tianzi_id=tianzi["id"]
    this.getZimis(this.source,this.tianzi_id)
    this.selectedZimi=null
}


selectPage(tianzi:{}):void{
    this.source=tianzi["source"]
    let page=tianzi["page"]
    this.getTianzilist(this.source,page,this.item_count)
}


saving:boolean=false;

update_tmp():void{
this.saving=true
let modifyzimis =[ ...this.zimis[0],...this.zimis[1]]
for(let zimi of modifyzimis){
  if(zimi.midi.length<zimi.midi_length){zimi.midi=""}  
}

this.zimiService.modifyZimisTemp(modifyzimis,this.tianzi_id)
    .subscribe(()=>{
      this.canChange=false
      this.saving=false
    }
    )
}  

cleanZimi():void{ 
   for(let zimi of this.zimis[0]){zimi['midi']="";zimi['question']="";zimi['answer']=""}
   for(let zimi of this.zimis[1]){zimi['midi']="";zimi['question']="";zimi['answer']=""}
   for(let grid of this.grids){if(grid['value']!=null){grid['value']=""}}
}


delete():void{ 
this.zimiService.deleteZimis(this.source,this.tianzi_id)
    .subscribe(()=>{this.getTianzilist(this.source,1,this.item_count)
      this.getZimis(this.source,this.tianzilist[this.source].perid)})
}

add(source:string):void{   
  let addzimis =[ ...this.zimis[0],...this.zimis[1]]     
    let disappear_grids=[]
    for(let grid of this.grids){
      if(!grid.appear){
        disappear_grids.push(grid.id)
      }
    }
    if (!addzimis) { return; }
    else{this.zimiService.addZimis(source,addzimis,disappear_grids)
    .subscribe(()=>{this.getTianzilist(this.source,1,this.item_count)})
    }
}

add_appearModel():void{
  let disappear_grids=[]
    for(let grid of this.grids){
      if(!grid.appear){
        disappear_grids.push(grid.id)
      }
    }
    if(disappear_grids.length!=0){
      this.zimiService.add_appearModel(disappear_grids)
      .subscribe(()=>{this.getAppearGrids_list()})
    }
  console.log(disappear_grids)

}


modifyTmp():void{
// this.cleanZimi()
 this.selectedZimi=null
 this.selectedGrids=[]
 this.canChange=true

}

cancleTmp():void{

   this.getZimis('tianzi_tmp',this.tianzilist['tianzi_tmp'].perid)
   this.canChange=false

}


back():void{
  let addzimis =[ ...this.zimis[0],...this.zimis[1]]
//  for (let zimi of addzimis){
//     zimi.midi_length=zimi.midi.length
//  }
  this.zimiService.addZimis('tianzi_tmp',addzimis,this.disappear_grids)
    .subscribe(()=>{this.delete()})
}

private tag:string=""
toJson():void{
 let zimis =[ ...this.zimis[0],...this.zimis[1]]
     let zimi_to_server={
         data:[],
         rate:0,
         zimi_id:this.tianzi_id,
         tag:this.tag
          }
     for(let zimi of zimis){
         zimi_to_server.data.push({"midi":zimi.midi,"answer":zimi.answer,"question":zimi.question,"zb":zimi.zb,"zongheng":zimi.zongheng})
         zimi_to_server.rate=zimi_to_server.rate+(zimi.clarity*0.5+1.2)*(zimi.difficulty*0.2+1.1)*1000
     }
     zimi_to_server.rate=Math.round(zimi_to_server.rate/zimis.length)
    
     var bl=JSON.stringify(zimi_to_server)
     
   this.saveFile(bl,"zimi_"+this.tag+this.tianzi_id+".txt");//saveAs(blob,filename)

   this.zimiService.savedInServer(this.tianzi_id,zimi_to_server.tag,zimi_to_server.rate)
       .subscribe(()=>{})
     }  


 saveFile(fileText,filename):void {
    let DownloadDom = document.getElementById("Download");


        let myBlob = new Blob([fileText], { type: "application/json" });
        DownloadDom['href'] = window.URL.createObjectURL(myBlob);
        DownloadDom['download']=filename

}



openMap = {
    tianzi_model: true,
    tianzi_tmp: false,
    tianzi_http: false
  };

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[ key ] = false;
      }
    }
    this.source=value
    this.getZimis(value,this.tianzilist[value].perid)
    this.selectedZimi=null

 };




constructor(
  	private zimiService:ZimiService,
  	private route: ActivatedRoute,) {
}



  ngOnInit() {    
    this.geTianzilist_first()
   	this.creatTianzi(); 
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Zimi } from './zimi';
import { Grid } from './grid';





const httpOptions = {
	  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

const httpOptions1 = {
	  headers: new HttpHeaders({ 'Content-Type': 'string' })
	};
const APPID="wx1c034e9511c8f70b";
const APPSECRET="21a1160f9bfbf0c48f800506e888d57e";

@Injectable()
export class ZimiService {	

    private Url = 'http://localhost:5757/weapp';
    private httpsUrl = 'http://localhost:5757/weapp/tianzi_http';
    private tmpUrl = 'http://localhost:5757/weapp/tianzi_tmp';
    private modelUrl = 'http://localhost:5757/weapp/tianzi_model';

	getZimis (source:string,id:number): Observable<any[]> {
	    let zimis_z:Zimi[]=[];
	    let zimis_h:Zimi[]=[];
	    let zimis_grids:Grid[]=[]
	    for(let i=0;i<100;i++){
        zimis_grids.push({
		                    id:i,
		                    value:null,
		                    zimi_h:-1,
		                    zimi_z:-1,
							appear:true
                    	     })         
        };
	    let zimis:any[]=[zimis_z,zimis_h,zimis_grids]
	    
        if(source!=""){
        //  let zimiUrl=(source=="http"?`${this.httpsUrl}/${id}`:`${this.tmpUrl}/${id}`)
        let zimiUrl=`${this.Url}/${source}/${id}`
	      this.http.get(zimiUrl).subscribe(data => { 
			console.log(data)
            let zimisOfserver=data['data'].zimi 
			let disappear=data['data'].disappear_grids.split(",")
			console.log(disappear) 
			
			for(let grid of zimis_grids){
				if(disappear.includes(grid.id.toString())){
				  grid.appear=false
				  grid.value=null
			   }
			   else{ grid.appear=true}
			  }


			for(let i=0;i<zimisOfserver.length;i++){
				zimisOfserver[i].id=i;

				if(!zimisOfserver[i].midi_length){
				zimisOfserver[i].midi_length=zimisOfserver[i].midi.length }     
		        

		        if(zimisOfserver[i].zongheng==1){
		        	zimis_h.push(zimisOfserver[i]);
		        	for(let j=0;j<zimisOfserver[i].midi_length;j++){
                    	zimis_grids[zimisOfserver[i].zb+j]={
                    	id:zimisOfserver[i].zb+j,
                    	value:	zimisOfserver[i].midi.charAt(j),
                    	zimi_h:i,
                    	zimi_z:-1,
						appear:true
                    	}
                 		}
		      		}
                else{
		        	zimis_z.push(zimisOfserver[i]);
		        	for(let j=0;j<zimisOfserver[i].midi_length;j++){
		        		if(zimis_grids[zimisOfserver[i].zb+j*10].zimi_h!=-1){
		        			zimis_grids[zimisOfserver[i].zb+j*10].zimi_z=i
		        			if(zimis_grids[zimisOfserver[i].zb+j*10].value!=''){}
		        				else{zimis_grids[zimisOfserver[i].zb+j*10].value=zimisOfserver[i].midi.charAt(j)}
		        			
		     		        		}                    	else{
                    		zimis_grids[zimisOfserver[i].zb+j*10]={
		                    	id:zimisOfserver[i].zb+j*10,	
		                    	value:	zimisOfserver[i].midi.charAt(j),
		                    	zimi_h:-1,
		                    	zimi_z:i,
								appear:true
                    	     	}
                    	}     
                    }
				}		  
			}
	     	})
			}


	    return of(zimis);
	}

	setZimis(grids): Observable<any[]> {
		let zimis: any[]=[];
		zimis[0]=[];
		zimis[1]=[];
    	let zimis_index=0;
    	let zimi:Zimi=null;
    	for(let i=0;i<100;i++){
            if(grids[i].value==null&&zimi==null){}
            else{            	
	    		if(grids[i].value!=null&&zimi==null){
	    			zimi={id: zimis_index++,
					  midi: grids[i].value,
					  question:'99999',
					  answer:'',
					  zb:i,
					  zongheng:1,	
                      midi_length:1,
 					  difficulty:1,
					  clarity:1,                     
					};
	                }
	           else{
			    	zimi.midi=zimi.midi+grids[i].value
			    	zimi.midi_length++
	            }  
                grids[i].zimi_h=zimis_index-1;

    		}

			if((i%10==9||grids[i+1].value==null)&&zimi!=null){
    		   if(zimi.midi_length>1){zimis[0].push(zimi)}
    		   	else{zimis_index--;
    		   		grids[i].zimi_h=-1

    		   	}
    		   zimi=null;
    	    	}
    		}

        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
	            if(grids[j*10+i].value==null&&zimi==null){}
	            else{
	            	
		    		if(grids[j*10+i].value!=null&&zimi==null){
		    			zimi={id: zimis_index++,
						  midi: grids[j*10+i].value,
						  question:'99999',
						  answer:'',
						  zb:j*10+i,
						  zongheng:0,
						  midi_length:1,
						  difficulty:1,
						  clarity:1,
						};
		                  
						  }
		           else{
				    	zimi.midi=zimi.midi+grids[j*10+i].value
				    	zimi.midi_length++
		            }     
		             grids[j*10+i].zimi_z=zimis_index-1;        
	    		}

				if((j==9||grids[j*10+i+10].value==null)&&zimi!=null){
	    		   if(zimi.midi_length>1){zimis[1].push(zimi)}
	    		   	else{zimis_index--;
	    		   		grids[j*10+i].zimi_z=-1;
	    		   	}
	    		   zimi=null;
    	        }
			}
		}
		return of(zimis);

    }


	getTianzi(source:string,page:number,peritem:number):Observable<any[]> {
		let Url= "http://localhost:5757/weapp/tianzi_list"
        let options={ params:new HttpParams().set('source',source).append('page',page.toString()).append('peritem',peritem.toString())}
		return this.http.get<any[]>(Url,options)  

	}

 	addZimis (source:string,zimis:Zimi[],disappear_grids:number[]): Observable<{}> {
        let Url="http://localhost:5757/weapp/tianzi_add"
  		let addzimis={"source":source,"zimi":zimis,"disappear_grids":disappear_grids}
  		return this.http.post<{}>(Url, addzimis).pipe(
        catchError(this.handleError<Zimi>('addZimi error'))
 	 );

	}

	add_appearModel(disappear_grids:number[]):Observable<{}>{
		let Url="http://localhost:5757/weapp/disappearGrids_add"
  		let grids={"grids":disappear_grids}
  		return this.http.post<{}>(Url, grids  ).pipe(
        catchError(this.handleError<Zimi>('add_appearModel error'))
		  )
	}

	delete_appearMOdel(id:number): Observable<{}> {

		let Url="http://localhost:5757/weapp/disappearGrids_delete"
		let nr={"id":id}
		return this.http.post<{}>(Url, nr, httpOptions).pipe(
	  catchError(this.handleError<string>('delete_appearMOdel'))
	);
	}
	getAppearGrids_list():Observable<{}>{
		let Url= "http://localhost:5757/weapp/disappearGrids_list"
        return this.http.get<any[]>(Url)  
	}

    modifyZimisTemp (zimis:Zimi[],tianzi_id:number): Observable<{}> {
  		let addzimis={"zimi":zimis}
  		let Url=`${this.tmpUrl}/${tianzi_id}`
  		return this.http.post<{}>(Url, addzimis, httpOptions).pipe(
        catchError(this.handleError<Zimi>('addZimi'))
 	 );

	}


    deleteZimis(source:string,tianzi_id:number): Observable<{}> {

  		let Url="http://localhost:5757/weapp/tianzi_delete"
  		let nr={"source":source,"id":tianzi_id}
  		return this.http.post<{}>(Url, nr, httpOptions).pipe(
        catchError(this.handleError<Zimi>('addZimi'))
 	 );
  	}

    savedInServer(tianzi_id:Number,tag:String,rate:Number):Observable<{}>{
        
        let Url="http://localhost:5757/weapp/zimionserver_add"
        let nr={tianzi_id:tianzi_id,tag:tag,rate:rate}
    	return this.http.post<{}>(Url, nr, httpOptions).pipe(
        catchError(this.handleError<string>('savedInServer'))
 	 );
    }



  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
     // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor( private http: HttpClient) {	
   }

}


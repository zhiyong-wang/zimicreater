import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


import { Zimi } from './zimi';
import { Grid } from './grid';
//import { ZIMIS } from './mock-zimi';

const httpOptions = {
	  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

const httpOptions1 = {
	  headers: new HttpHeaders({ 'Content-Type': 'string' })
	};


@Injectable()
export class ZimiService {	


    private httpsUrl = 'http://localhost:5757/weapp/tianzi';
    private tmpUrl = 'http://localhost:5757/weapp/tianzi_tmp';

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
                    	     })         
        };
	    let zimis:any[]=[zimis_z,zimis_h,zimis_grids]
	    
        if(source!=""){
          let zimiUrl=(source=="http"?`${this.httpsUrl}/${id}`:`${this.tmpUrl}/${id}`)

	      this.http.get(zimiUrl).subscribe(data => { 
			for(let i=0;i<data['data'].length;i++){
				data['data'][i].id=i;	
				if(!data['data'][i].midi_length){
				data['data'][i].midi_length=data['data'][i].midi.length }     
		        

		        if(data['data'][i].zongheng==1){
		        	zimis_h.push(data['data'][i]);
		        	for(let j=0;j<data['data'][i].midi_length;j++){
                    	zimis_grids[data['data'][i].zb+j]={
                    	id:data['data'][i].zb+j,
                    	value:	data['data'][i].midi.charAt(j),
                    	zimi_h:i,
                    	zimi_z:-1,
                    	}
                 		}
		      		}
                else{
		        	zimis_z.push(data['data'][i]);
		        	for(let j=0;j<data['data'][i].midi_length;j++){
		        		if(zimis_grids[data['data'][i].zb+j*10].zimi_h!=-1){
		        			zimis_grids[data['data'][i].zb+j*10].zimi_z=i
		        		}
                    	else{
                    		zimis_grids[data['data'][i].zb+j*10]={
		                    	id:data['data'][i].zb+j*10,	
		                    	value:	data['data'][i].midi.charAt(j),
		                    	zimi_h:-1,
		                    	zimi_z:i,
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
                      midi_length:1
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
						  midi_length:1
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

   

	getTianzi(source:string):Observable<any[]> {
		let tianziUrl= "http://localhost:5757/weapp/tianzi_list"
		let Url=`${tianziUrl}/${source}`
		return this.http.get<any[]>(Url)  

	}

 	addZimis (source:string,zimis:Zimi[]): Observable<{}> {
        let Url="http://localhost:5757/weapp/tianzi_add"
  		let addzimis={"source":source,"zimi":zimis}
  		return this.http.post<{}>(Url, addzimis, httpOptions).pipe(
        catchError(this.handleError<Zimi>('addZimi'))
 	 );

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


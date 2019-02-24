import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { WordItem} from './WordItem';
import { Tag} from './WordItem'

const httpOptions = {
	  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

const httpOptions1 = {
	  headers: new HttpHeaders({ 'Content-Type': 'text/plain' })
	};

@Injectable({
  providedIn: 'root',
})

export class QuestionService {
  private httpsUrl = 'http://localhost:5757/weapp/tianzi';
  
 	addwordItem (wordItem:WordItem): Observable<{}> {
      let Url="http://localhost:5757/weapp/question_add"
  		return this.http.post<{}>(Url, wordItem, httpOptions).pipe(
        catchError(this.handleError<WordItem>('addWordItem'))
 	 );
   }
   modifywordItem (wordItem:WordItem): Observable<{}> {
      let Url="http://localhost:5757/weapp/question"
      return this.http.post<{}>(Url, wordItem, httpOptions).pipe(
        catchError(this.handleError<WordItem>('addWordItem'))
    );
   }

  deletewordItem(wordItem:WordItem):Observable<{}> {

      let Url="http://localhost:5757/weapp/question_delete"
      return this.http.post<{}>(Url, wordItem, httpOptions).pipe(
        catchError(this.handleError<string>('deletewordItem'))
    );
}


  getwordItems(tags:string,page:number,peritem:number):Observable<any[]> {
      let tUrl="http://localhost:5757/weapp/question_list"
      let options={ params:new HttpParams().set('tags',tags).append('page',page.toString()).append('peritem',peritem.toString())}
      let Url=`${tUrl}`
      return this.http.get<any[]>(Url,options)
    
    }

  getwordItem(id:number|string):Observable<any>{
    let tUrl= "http://localhost:5757/weapp/question"
    let Url=`${tUrl}/${id}`
      return this.http.get<any>(Url)
    
    }

   addtag (tag:Tag): Observable<{}> {
      let Url="http://localhost:5757/weapp/tag_add"
      return this.http.post(Url, tag, httpOptions).pipe(
        catchError(this.handleError<string>('addtag'))
    );
   }

   deletetag(tag:Tag):Observable<{}> {

      let Url="http://localhost:5757/weapp/tag_delete"
      return this.http.post<{}>(Url, tag, httpOptions).pipe(
        catchError(this.handleError<string>('deleteTag'))
    );
}

   gettags():Observable<string[]>{
      let Url= "http://localhost:5757/weapp/tags_list"
      return this.http.get<any>(Url)

   } 

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
     // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  constructor( private http: HttpClient) {}

}

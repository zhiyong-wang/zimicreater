import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { WordItem} from './WordItem'

const httpOptions = {
	  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

const httpOptions1 = {
	  headers: new HttpHeaders({ 'Content-Type': 'string' })
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


  getwordItems():Observable<any[]> {
      let Url="http://localhost:5757/weapp/question_list"
      return this.http.get<any[]>(Url)
    
    }

  getwordItem(id:number|string):Observable<any>{
    let tUrl= "http://localhost:5757/weapp/question"
    let Url=`${tUrl}/${id}`
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

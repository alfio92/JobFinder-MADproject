import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/throw';

/*
  Generated class for the ProcessHttpMsgProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProcessHttpMsgProvider {

  constructor(public http: Http) {
    console.log('Hello ProcessHttpMsgProvider Provider');
  }

  public extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body ||  {};
  }

// gestiamo il caso in cui il server ritorna un errore
  public handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

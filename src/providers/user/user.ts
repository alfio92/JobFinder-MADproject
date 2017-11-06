import { Injectable } from '@angular/core';

import { User } from '../../interfaces/user';
import { baseURL } from '../../interfaces/baseurl';

import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ProcessHttpMsgProvider } from '../process-http-msg/process-http-msg';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: Http, private processHttpMsgService: ProcessHttpMsgProvider) {
    console.log('Hello UserProvider Provider'); let id=2;
    console.log(baseURL);
    console.log(baseURL+"users/"+id);
  }

getUser(id): Observable<User>{
  console.log("HO FAtto GEt");
    return  this.http.get(baseURL + 'users/'+ id)
                    .map(res => { return this.processHttpMsgService.extractData(res); })
                    .catch(error => { return this.processHttpMsgService.handleError(error); });
    
}

updateUserData(userData): Observable<User>{
  let data = JSON.stringify(userData);
  let headers = new Headers({ 'Content-Type': 'application/json'});
  let option = new RequestOptions({ headers: headers });

  return this.http.put(baseURL + 'users', data, option)
           .map((res:Response) => { return this.processHttpMsgService.extractData(res);}) // ...and calling .json() on the response to return data

           .catch((error:any) => { return this.processHttpMsgService.handleError(error) }); //...errors if any
}

}

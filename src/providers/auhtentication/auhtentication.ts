import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ProcessHttpMsgProvider } from '../process-http-msg/process-http-msg';
import { UserstorageProvider } from '../userstorage/userstorage';

import { Storage } from '@ionic/storage';

import { baseURL } from '../../interfaces/baseurl';
import { User } from '../../interfaces/user';
import { BusinessUser} from '../../interfaces/businessUser';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


/*
  Generated class for the AuhtenticationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuhtenticationProvider {

  constructor(public http: Http, private processHttpMsgService: ProcessHttpMsgProvider,
              public storage: Storage, private userstorage: UserstorageProvider) {
    console.log('Hello AuhtenticationProvider Provider');
  }

  login(loginData: any): Observable<any>{ 

    let usertype;
    if(loginData.usertype === 'business') usertype = 'businessusers';
          else usertype= 'users';
   
    return this.http.get(baseURL + usertype + '?email=' + loginData.email + '&password=' + loginData.password)
                    .map(res => {   
                                      
                                      return this.processHttpMsgService.extractData(res)[0];
                                })
                    .catch(error => { return this.processHttpMsgService.handleError(error); })
  }
/*
  saveUserData(user: any, usertype: string){
    //salvo in locale i dati dell'utente
    this.storage.set('isLogged', user);
    this.storage.set('usertype', usertype);
    console.log(user+" "+ usertype)
    console.log(this.storage.get('isLogged').then((data)=> console.log(data)));

  } */

  //esegue il signup

  signup(data: any) {
    //post dei dati utente per il signup
    this.userExistsControl(data.email, data.usertype, data.lat, data.lng).subscribe( (response) => {

        if(response == true){
          return  this.postUser(data);
        }
              
            else return '';
      })  
  }

  //true se l'email(utente) non è sul DB, false altrimenti

  userExistsControl(email, usertype, lat?, lng?): Observable<boolean>{
    let position: string;
    if(usertype === 'businessusers' && lat != undefined && lng != undefined) position = '&lat=' + lat + '&lng=' + lng;
        else position = ''; 

    return this.http.get(baseURL + usertype +'?email=' + email + position)
                    .map(res => { 
                                  let response;
                                  response = this.processHttpMsgService.extractData(res);
                                    if( response==null ) return true;
                                       else return false;  
                                })
                    .catch(error => { return this.processHttpMsgService.handleError(error); })
  }
/*
  //true se l'attività non è sul DB, false altrimenti
  businessUserExistsControl(coords): Observable<boolean>{
    //prendo le coordinate dell'attività da google nearby search api ed eseguo il controllo
    return this.http.get(baseURL + 'businessusers?lat=&lng=')
                    .map(res => {
                                  if(res==null) return true;
                                    else return false;
                                })
                    .catch(error => { return this.processHttpMsgService.handleError(error); })
  } */

  postUser(user: any): Observable<any> {
    
    let data = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let option = new RequestOptions({ headers: headers });

    let usertype: string;

    if( user.businessname === undefined) usertype = 'users';
        else usertype = 'businessusers';

    return this.http.post(baseURL + usertype, data, option)
             .map((res:Response) => { return this.processHttpMsgService.extractData(res);}) // ...and calling .json() on the response to return data

             .catch((error:any) => { return this.processHttpMsgService.handleError(error) }); //...errors if any
  }  

  updatePss(newPss:string){}

  activateNewPss(activateCode: string){}
/*
  postBusinessUser(user: BusinessUser){
     
    let data = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let option = new RequestOptions({ headers: headers });

    this.http.post(baseURL + 'businessusers', data, option)
        .map((res:Response) =>  { 
                                  this.processHttpMsgService.extractData(res)
                                  this.saveUserData(data);
                                }) // ...and calling .json() on the response to return data
        .catch((error:any) => this.processHttpMsgService.handleError(error)); //...errors if any
  } */
}

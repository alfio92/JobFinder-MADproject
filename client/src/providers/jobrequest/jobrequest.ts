import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ProcessHttpMsgProvider } from '../process-http-msg/process-http-msg';

import 'rxjs/add/operator/map';

import { baseURL } from "../../interfaces/baseurl";
import { JobRequest } from "../../interfaces/jobrequest";

/*
  Generated class for the JobrequestProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class JobrequestProvider {

  constructor(public http: Http, private processHttpMsgService: ProcessHttpMsgProvider) {
    console.log('Hello JobrequestProvider Provider');
  }

  // ottieni tutte le candidature per un dato annuncio
  getJobRequestByJobAd(id) : Observable<JobRequest[]>{
    console.log("PROVIDER  "+id);
    return this.http.get(baseURL + 'jobrequests?jobadId='+id)
                    .map((res) => { return this.processHttpMsgService.extractData(res);}) // ...and calling .json() on the response to return data
                    .catch((error) => { return this.processHttpMsgService.handleError(error) }); //...errors if any

  }

   // ottieni tutte le candidature di un dato utente
   getJobRequestByUser(id) : Observable<JobRequest[]>{
    
        return this.http.get(baseURL + 'jobrequests/user/'+id)
                        .map((res) => { return this.processHttpMsgService.extractData(res);}) // ...and calling .json() on the response to return data
                        .catch((error) => { return this.processHttpMsgService.handleError(error) }); //...errors if any
    
      }

     // ottieni tutte le candidature di un dato utente
   controlUserAlreadySendedReq(userId, jobId) : Observable<JobRequest>{
    
        return this.http.get(baseURL + 'jobrequests?userId='+userId + '&jobadsId='+jobId)
                        .map((res) => { return this.processHttpMsgService.extractData(res);}) // ...and calling .json() on the response to return data
                        .catch((error) => { return this.processHttpMsgService.handleError(error) }); //...errors if any
    
      }

    //inserisce una nuova candidatura ad un dato annuncio
  postJobRequest(request): Observable<JobRequest[]>{
    
        let data = JSON.stringify(request);
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let option = new RequestOptions({ headers: headers });
    
        return this.http.post(baseURL + 'jobrequests', data, option)
                 .map((res) => { return this.processHttpMsgService.extractData(res);}) // ...and calling .json() on the response to return data
    
                 .catch((error) => { return this.processHttpMsgService.handleError(error) }); //...errors if any
    
      }

      //risponde ad una candidatura
  replyJobRequest(request) : Observable<JobRequest[]> {   
     //   let dataObj ={id: id, status: reply};// "id:"+id+", reply:"+reply;
     //   let data = JSON.stringify(dataObj);
      //  console.log(data);
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let option = new RequestOptions({ headers: headers });
    
        return this.http.put(baseURL + 'jobrequests/'+request.id, request, option)
                 .map((res) => { return this.processHttpMsgService.extractData(res);}) // ...and calling .json() on the response to return data
    
                 .catch((error) => { return this.processHttpMsgService.handleError(error) }); //...errors if any
    
      }

     //elimina una candidatura
  deleteJobRequest(id): Observable<JobRequest[]>{
      console.log(id);
        return this.http.delete(baseURL + 'jobrequests/'+id)
                 .map((res) => { return this.processHttpMsgService.extractData(res);}) // ...and calling .json() on the response to return data
    
                 .catch((error) => { return this.processHttpMsgService.handleError(error) }); //...errors if any
    
      }
    
        //elimina una candidatura
  deleteJobRequestsByJobAd(jobAdId): Observable<JobRequest[]>{
    
        return this.http.delete(baseURL + 'jobrequests?jobadId='+jobAdId)
                 .map((res) => { return this.processHttpMsgService.extractData(res);}) // ...and calling .json() on the response to return data
    
                 .catch((error) => { return this.processHttpMsgService.handleError(error) }); //...errors if any
    
      }
    

}

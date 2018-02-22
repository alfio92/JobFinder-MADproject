import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ProcessHttpMsgProvider } from '../process-http-msg/process-http-msg';
import { Job } from '../../interfaces/job';
import { BusinessUser } from '../../interfaces/businessuser';
import { baseURL } from '../../interfaces/baseurl';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the JobProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class JobProvider {

  constructor(public http: Http,
              private processHttpMsgService: ProcessHttpMsgProvider) {
    console.log('Hello JobProvider Provider');
  }
//ottengo annunci(per ottenere gli annunci dei luoghi più vicini passare al server le coordinate della mia posizione)
/*
getJobAds(lat, long, range): Observable<Job[]>{
    return this.http.get(baseURL + 'jobads?expired=false&range='+range+'&lat='+lat+'&long='+long)
    .map(res => { return this.processHttpMsgService.extractData(res); })
    .catch(error => { return this.processHttpMsgService.handleError(error); });
  }
*/
  getJobAds(): Observable<Job[]>{
    return this.http.get(baseURL + 'jobads?expired=false')
    .map(res => { return this.processHttpMsgService.extractData(res); })
    .catch(error => { return this.processHttpMsgService.handleError(error); });
  }

  getJobAd(id: number): Observable<Job>{
    return  this.http.get(baseURL + 'jobads/'+ id)
    .map(res => { return this.processHttpMsgService.extractData(res); })
    .catch(error => { return this.processHttpMsgService.handleError(error); });
  }
  //ottiene gli annunci postati dall'attivita data in input e non scaduti
  getJobAdsByBusinessUser(id: number): Observable<Job[]>{
    return this.http.get(baseURL + 'jobads?iduser='+id+'&expired=false')
    .map(res => { return this.processHttpMsgService.extractData(res); })
    .catch(error => { return this.processHttpMsgService.handleError(error); });
  }
//ottiene gli annunci postati dall'attività data in input e scaduti
  getJobAdsExpiredByBusinessUser(id: number): Observable<Job[]>{
    return this.http.get(baseURL + 'jobads?iduser='+id+'&expired=true')
    .map(res => { return this.processHttpMsgService.extractData(res); })
    .catch(error => { return this.processHttpMsgService.handleError(error); });
  }

  //inserisce un nuovo annuncio
  postJob(job, businessuser: BusinessUser): Observable<Job>{

    let data = JSON.stringify(job);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let option = new RequestOptions({ headers: headers });

    return this.http.post(baseURL + 'jobads', data, option)
             .map((res:Response) => { return this.processHttpMsgService.extractData(res);}) // ...and calling .json() on the response to return data

             .catch((error:any) => { return this.processHttpMsgService.handleError(error) }); //...errors if any

  }

  deleteJob(id): Observable<Job[]>{
    return this.http.delete(baseURL + 'jobads/' + id)
                    .map(res => { 
                                        return this.processHttpMsgService.extractData(res); 
                                        
                                  })
                    .catch(error => { return this.processHttpMsgService.handleError(error); });
  }

  //inserisce una nuova candidatura ad un dato annuncio
  postJobRequest(id, request): Observable<Job[]>{

    let data = JSON.stringify(request);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let option = new RequestOptions({ headers: headers });

    return this.http.post(baseURL + 'jobrequests/' + id, data, option)
             .map((res) => { return this.processHttpMsgService.extractData(res);}) // ...and calling .json() on the response to return data

             .catch((error) => { return this.processHttpMsgService.handleError(error) }); //...errors if any

  }

  //risponde ad una candidatura
  replyJobRequest(jobRequest){

    let data = JSON.stringify(jobRequest);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let option = new RequestOptions({ headers: headers });

    return this.http.put(baseURL + 'jobrequests/' + jobRequest.id, data, option)
             .map((res) => { return this.processHttpMsgService.extractData(res);}) // ...and calling .json() on the response to return data

             .catch((error) => { return this.processHttpMsgService.handleError(error) }); //...errors if any

  }

  //aggiorna annuncio ponendolo come scaduto
  jobAdExpired(job){

    let data = JSON.stringify(job);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let option = new RequestOptions({ headers: headers });

    return this.http.put(baseURL + 'jobads/' + job.id, data, option)
             .map((res) => { return this.processHttpMsgService.extractData(res);}) // ...and calling .json() on the response to return data

             .catch((error) => { return this.processHttpMsgService.handleError(error) }); //...errors if any    

  }

}

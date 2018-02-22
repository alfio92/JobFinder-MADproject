import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ProcessHttpMsgProvider } from '../process-http-msg/process-http-msg';

/*
  Generated class for the GeolocationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GeolocationProvider {

  constructor(public http: Http, private processHttpMsgService: ProcessHttpMsgProvider) {
    console.log('Hello GeolocationProvider Provider');
  }

  getBusinessUserCoordinates(link): Observable<any>{

    return this.http.get(link)
    .map(res => { return this.processHttpMsgService.extractData(res); })
    .catch(error => { return this.processHttpMsgService.handleError(error); });

  }

}

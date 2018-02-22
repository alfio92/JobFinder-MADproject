import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ProcessHttpMsgProvider } from '../process-http-msg/process-http-msg';

import 'rxjs/add/operator/map';

import { baseURL } from "../../interfaces/baseurl";
import { BusinessType } from '../../interfaces/businesstype';

/*
  Generated class for the BusinesstypeProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BusinesstypeProvider {

  constructor(public http: Http, public processHttpMsgService: ProcessHttpMsgProvider) {
    console.log('Hello BusinesstypeProvider Provider');
  }

  //ottengo tipi di attività 
  getBusinessTypes(): Observable<BusinessType[]>{
    return this.http.get(baseURL + 'businesstype')
    .map(res => { return this.processHttpMsgService.extractData(res); })
    .catch(error => { return this.processHttpMsgService.handleError(error); });
  }

}

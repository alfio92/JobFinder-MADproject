import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ProcessHttpMsgProvider } from '../process-http-msg/process-http-msg';

import 'rxjs/add/operator/map';

import { baseURL } from "../../interfaces/baseurl";
import { Skill } from '../../interfaces/skill';
/*
  Generated class for the SkillProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SkillProvider {

  constructor(public http: Http, public processHttpMsgService: ProcessHttpMsgProvider) {
    console.log('Hello SkillProvider Provider');
  }

  //ottengo skills
  getSkills(): Observable<Skill[]>{
    return this.http.get(baseURL + 'skill')
    .map(res => { return this.processHttpMsgService.extractData(res); })
    .catch(error => { return this.processHttpMsgService.handleError(error); });
  }

}

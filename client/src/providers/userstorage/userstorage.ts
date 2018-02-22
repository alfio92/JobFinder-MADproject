import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import { User } from "../../interfaces/user";
import { BusinessUser } from "../../interfaces/businessuser";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the UserstorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserstorageProvider {

  data: string;
  user: User;
  business: BusinessUser;

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello UserstorageProvider Provider');
  }
// salva i dati dell'utente in locale e il tipo di utente loggato
  saveData(data: any): Promise<any>{

    let json = JSON.stringify(data);
 return this.storage.set('isLogged', json);
 
 /*   if(data.businessname != undefined) this.storage.set('usertype', 'business');
        else this.storage.set('usertype', 'user'); */
  }

  saveUserType(usertype: string): Promise<any>{
           
    return this.storage.set('usertype', usertype);
  }

// ritorna i dati dell'utente
 fetchLoggedUser(): Promise<any> {

        return this.storage.get('isLogged');
  
  }

 
// ritorna il tipo di utente
 fetchUsertype(): Promise<any> {
  
   return  this.storage.get('usertype');

  }
  

//pulisce tutto lo storage locale
  clearStorage(): Promise<any>{

    return this.storage.clear();
  }

}

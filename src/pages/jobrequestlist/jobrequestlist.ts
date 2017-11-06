import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { JobrequestProvider } from '../../providers/jobrequest/jobrequest';
import { JobProvider } from '../../providers/job/job';

import { Job } from '../../interfaces/job'
import { JobRequest } from '../../interfaces/jobrequest';

/**
 * Generated class for the JobrequestlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// lista degli annunci dove l'utente loggato ha inviato la richiesta

@IonicPage()
@Component({
  selector: 'page-jobrequestlist',
  templateUrl: 'jobrequestlist.html',
})
export class JobrequestlistPage {

  jobrequests : JobRequest[];
  jobs : Job[];
  jobsIds : any[];
  myId : string;
  errMess : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Jobservice: JobProvider,
              private Jobrequestservice: JobrequestProvider) {

    this.myId = navParams.get('user');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobrequestlistPage');

    // ottiene tutte le candidature dell'utente loggato

    this.Jobrequestservice.getJobRequestByUser(this.myId).subscribe(

      jobrequests => {
                        this.jobrequests = jobrequests;
                        this.getJobadsById();
                      },
      errMess => this.errMess = <any>errMess

    );

  }

  getJobadsById(){

    for(let i= 0; i<this.jobrequests.length; i++){

      this.Jobservice.getJobAd(this.jobrequests[i].jobadId).subscribe(

        job => this.jobs.push(job),
        errMess => this.errMess = <any>errMess

      );

    }
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ToastController, Events} from 'ionic-angular';

import { JobrequestProvider } from '../../providers/jobrequest/jobrequest';
import { JobProvider } from '../../providers/job/job';

import { Job } from '../../interfaces/job'
import { JobRequest } from '../../interfaces/jobrequest';

import { JobrequestPopoverPage } from '../jobrequest-popover/jobrequest-popover';
import { JobPage } from '../job/job';

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
  jobs : Job[] = [];
  job : Job;
  jobsIds : any[];
  myId : string;
  errMess : string;
  allLoaded : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Jobservice: JobProvider,public popoverCtrl: PopoverController,
              private Jobrequestservice: JobrequestProvider, public toastCtrl:ToastController, public events:Events) {

    this.myId = navParams.get('parameter');
        
    events.subscribe('deletejobrequest:jobrequestlist', (jobreqId) => {
      
      this.Jobrequestservice.deleteJobRequest(jobreqId).subscribe(
        (data) =>{

                  this.jobrequests = data;
                  this.presentToast();
                  this.getJobRequests();
                  this.allLoaded = false;

              },
        errMess => this.errMess = <any>errMess
      )
      
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobrequestlistPage');

    // ottiene tutte le candidature dell'utente loggato

    this.getJobRequests();

  }

  getJobRequests(){

    this.Jobrequestservice.getJobRequestByUser(this.myId).subscribe(

      jobrequests => {
                        this.jobrequests = jobrequests;
                      //  this.getJobadsById();
                      },
      errMess => this.errMess = <any>errMess

    );

  }

  getJobadsById(){

    if(this.jobrequests.length == 0) this.allLoaded = true;

    for(let i= 0; i<this.jobrequests.length; i++){

      this.Jobservice.getJobAd(this.jobrequests[i].jobadId).subscribe(

        data => {
                this.job = data;
                this.job.jobrequests = [];
                this.job.jobrequests.push(this.jobrequests[i]);
                this.jobs.push(this.job);
                if( i == this.jobrequests.length -1) this.allLoaded = true;
              },
        errMess => this.errMess = <any>errMess

      );
   
    }
  }
/*
  goToJob(job){
    this.navCtrl.push(JobPage, {
      job: job,
      user: this.myId,
     // pos: this.myPosition
    });
  }
*/
  presentPopover(event, jobreqid){
    
    let popover = this.popoverCtrl.create(JobrequestPopoverPage,{id: jobreqid});
    popover.present({
      ev: event
    });

  }

  presentToast(){
    this.toastCtrl.create({
      message: "La candidatura è stata eliminata",
      position: 'top',
      duration: 3000}).present();
  }

}

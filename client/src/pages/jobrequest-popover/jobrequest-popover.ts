import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';

import { JobrequestProvider } from '../../providers/jobrequest/jobrequest';
/**
 * Generated class for the JobrequestPopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jobrequest-popover',
  templateUrl: 'jobrequest-popover.html',
})
export class JobrequestPopoverPage {

  jobReqId : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              private jobrequestservice: JobrequestProvider, public events: Events) {
                this.jobReqId = navParams.get("id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobrequestPopoverPage');
   // this.jobReqId = this.navParams.get('id');
  }

  deleteReq(){
    
    //richiamo il provider passando jobAdId
    //this.jobservice.deleteJob(this.jobAdId).subscribe()
    console.log("JOBREQ POPOVER  " + this.jobReqId);
    this.events.publish("deletejobrequest:jobrequestlist", this.jobReqId);
    this.viewCtrl.dismiss();    

  }

}

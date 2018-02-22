import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';

import { JobProvider } from '../../providers/job/job';

/**
 * Generated class for the JobadPopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jobad-popover',
  templateUrl: 'jobad-popover.html',
})
export class JobadPopoverPage {

  jobAdId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              private jobservice: JobProvider, public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobadPopoverPage');
    this.jobAdId = this.navParams.get('id');
  }

  deleteAd(){
    this.viewCtrl.dismiss();
    //richiamo il provider passando jobAdId
    //this.jobservice.deleteJob(this.jobAdId).subscribe()
    this.events.publish("deletead:jobadlist", this.jobAdId);
      
  }

}

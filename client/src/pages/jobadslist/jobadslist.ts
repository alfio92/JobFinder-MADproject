import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ToastController, LoadingController,Events} from 'ionic-angular';
import { JobProvider } from '../../providers/job/job';
import { JobrequestProvider } from '../../providers/jobrequest/jobrequest';

import { Job } from '../../interfaces/job'
import { baseURL } from '../../interfaces/baseurl';

import { JobadPopoverPage } from '../jobad-popover/jobad-popover';
/**
 * Generated class for the JobadslistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 // lista annunci creati dall'attività loggata

@IonicPage()
@Component({
  selector: 'page-jobadslist',
  templateUrl: 'jobadslist.html',
})
export class JobadslistPage {

  jobs: Job[];
//  requestNum: number[];
  errMess: string;
  candidatesNum: number[] = [];
  acceptedCandNum: number[] = [];
  candNumLoaded: boolean = false;
  adIndex: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
              private jobservice: JobProvider, private jobrequestservice: JobrequestProvider,
              public toastCtrl: ToastController, public events: Events, public loadingCtrl: LoadingController) {

                events.subscribe("deletead:jobadlist", (id) => {

                  this.deleteJobAd(id);

                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobadslistPage');

      let id = this.navParams.get('parameter'); console.log(id);
      this.jobservice.getJobAdsByBusinessUser(id).subscribe(

        jobs =>   {
                    this.jobs = jobs;
                    this.countCandidates();
                  },
        errMess => this.errMess = <any>errMess

      );

  }

  deleteRow(index){}

  deleteJobAd(id){
    
    //fai comparire alert
    //esegui post sul provider
    //jobs a [] e riassocio alla risposta del server

    let loading = this.loadingCtrl.create({
      
      content: "Rimozione annuncio"
        
    });

    this.jobservice.deleteJob(id).subscribe(  
        jobs => {
                  if( jobs == null) this.jobs = [];
                      else this.jobs = jobs
                  
                  this.deleteJobReqsByJobAds(id);  //dopo aver eliminato l'annuncio, elimino le candidature di quell'annuncio 
                 // this.deleteRow();
                  loading.dismiss();
                },
        errMess => {
                  this.errMess = <any>errMess;
                  loading.dismiss();
                }
    );

    loading.present();

  }

  deleteJobReqsByJobAds(id){

    this.jobrequestservice.getJobRequestByJobAd(id).subscribe(

      res => {
               
                // se esistono candidature per l'annuncio da eliminare, elimino anche le candidature
                if(res != null) {

                     this.jobrequestservice.deleteJobRequestsByJobAd(id).subscribe(
                    
                          () => this.presentToast(), // mostro il messaggio di rimozione avvenuta
                    
                          errMess => this.errMess = <any>errMess
                        );

                        }
                          else this.presentToast();
              },

      errMess => this.errMess = <any>errMess
    );

  }

  //conta tutti i candidati e i candidati accettati per ogni annuncio
  countCandidates(){

    for(let i=0; i<this.jobs.length; i++){
        this.jobrequestservice.getJobRequestByJobAd(this.jobs[i].id).subscribe(
          jobrequests => {
                            if(jobrequests === undefined) jobrequests = [];
                            this.candidatesNum[i] = jobrequests.length;
                            this.acceptedCandNum[i] = 0;
                            
                            for(let j=0; j < jobrequests.length; j++){

                              if( jobrequests[j].status === 'accepted') this.acceptedCandNum[i]++;
                              if( j == jobrequests.length-1) this.candNumLoaded = true;
                            }
                            
                          },

          errMess => this.errMess = <any>errMess
        );

    }

  }

  presentPopover(event, jobAdId){
    
          let popover = this.popoverCtrl.create(JobadPopoverPage,{id: jobAdId});
          popover.present({
            ev: event
          });
    
        }
    
  presentToast(){
    this.toastCtrl.create({
      message: "L'annuncio è stato eliminato",
      position: 'top',
      duration: 3000}).present();
  }

}

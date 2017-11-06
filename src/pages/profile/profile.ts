import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';

import { User } from '../../interfaces/user';
import { JobRequest } from '../../interfaces/jobrequest';
import { Job } from '../../interfaces/job';

import { UserProvider } from '../../providers/user/user';
import { JobrequestProvider } from '../../providers/jobrequest/jobrequest';
import { JobProvider } from '../../providers/job/job';

import { JobPage } from '../job/job';
import { EditCurriculumModalPage } from '../edit-curriculum-modal/edit-curriculum-modal';

//import { File } from '@ionic-native/file';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// profilo dell'utente loggato

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  myUserId: number;
  userId: number;
  user: User;
  jobs: Job[] = [];
  jobRequests : JobRequest[] = [];
  errMess: string;
  selectedSegment: string;
  myProfile: boolean;     // true se il profile è quello dell'utente loggato, false altrimenti

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private userservice: UserProvider,
              public loadingCtrl:LoadingController, private jobrequestservice: JobrequestProvider, public toastCtrl: ToastController,
              private jobservice: JobProvider, @Inject('BaseURL') private BaseURL) {

                this.userId = navParams.get('profile');
                this.myUserId = navParams.get('myId');
                console.log(this.myUserId+"  DIODIO "+this.userId);
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    console.log(this.user);
    this.selectedSegment = "detail";

    //determino se il profilo è dell'utente loggato
    this.myProfile = (this.userId == this.myUserId); //se true aggiunge l'icona che apre il modal per aggiornare il profilo

    let loading = this.loadingCtrl.create({
      
      content: "Caricamento Dati"
        
    });

    this.userservice.getUser(this.userId).subscribe(
      
            user => {this.user = user; console.log(this.user); loading.dismiss()},
            errMess => this.errMess = errMess
      
          );
    loading.present();
    this.getUserRequests();
    
  }
  
   //mostra messaggio
   presentToast(msg: string, pos: string){
    
          let toast = this.toastCtrl.create({ 
            message: msg,
            duration: 3000,
            position: pos
          });
    
          toast.present();
    
        }


// ottengo le candidature dell'utente
  getUserRequests(){

    this.jobrequestservice.getJobRequestByUser(this.userId).subscribe(

      jobrequests => {
                        this.jobRequests = jobrequests;
                     //   this.getJobAdsByUserReq();
                      },
      errMess => this.errMess = <any>errMess

    );

  }

  // ottengo tutti gli annunci per cui l'utente del profilo abbia effettuato una candidatura
  getJobAdsByUserReq(){

    for(let i=0; i<this.jobRequests.length; i++){

      this.jobservice.getJobAd(this.jobRequests[i].jobadId).subscribe(

        job =>  { 
                  this.jobs[i] = job;
                  this.jobs[i].jobrequests=[];
                  this.jobs[i].jobrequests.push(this.jobRequests[i]);
                },

        errMess => this.errMess = <any>errMess

      )

    }
  }

  goToJobPage(job){

    this.navCtrl.push(JobPage,{
          job: job,
    })

  }
//apre il modal per modificare il curriculum, chiama il server per modificare le info dell'utente
  openEditCurriculumModal(){

    if(this.myProfile){
      let  editModal = this.modalCtrl.create(EditCurriculumModalPage, { user: this.user });
      editModal.present();
      editModal.onDidDismiss( data => {
      
          this.user.skills = data.skills;
          this.user.curriculum = data.curriculum;
          this.userservice.updateUserData(this.user).subscribe(

            (user) => {
                        this.user=user;
                        this.presentToast("Il tuo curriculum è stato aggiornato", "top");
                      },
            errMess => this.errMess = <any>errMess

          );
        });
      }

      
   }
  
}

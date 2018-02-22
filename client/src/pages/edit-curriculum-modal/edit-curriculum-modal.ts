import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { User } from "../../interfaces/user";

import { UserProvider } from "../../providers/user/user";

/**
 * Generated class for the EditCurriculumModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-curriculum-modal',
  templateUrl: 'edit-curriculum-modal.html',
})
export class EditCurriculumModalPage {

  user: User;
  editCurriculumForm : FormGroup;
  errMess: string;
  cv: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController,
              private viewCtrl: ViewController, public formBuilder: FormBuilder, public userservice:UserProvider) {

    this.user = navParams.get('user');

    this.editCurriculumForm = this.formBuilder.group({
      skills: [this.user.skills, Validators.required ],
      curriculum: [this.user.curriculum, Validators.required],
    
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCurriculumModalPage');
    console.log(this.user.curriculum);
    console.log(this.user.skills);
    this.editCurriculumForm.value.curriculum = this.user.curriculum;
    
  }

  onSubmit(){

    console.log(this.editCurriculumForm.value);
    
          this.user.skills = this.editCurriculumForm.value.skills;
          this.user.curriculum = this.editCurriculumForm.value.curriculum;
          this.userservice.updateUserData(this.user).subscribe(

            (user) => {
                        this.user=user;
                        this.presentToast("Il tuo curriculum è stato aggiornato", "top");
                      },
            errMess => { 
                        this.errMess = <any>errMess;
                        this.presentToast("Errore aggiornamento curriculum", "top");
                        }

          );

    this.viewCtrl.dismiss(this.editCurriculumForm.value);
    

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

  dismiss(){
    this.viewCtrl.dismiss();
  }

}

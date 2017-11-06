import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { User } from "../../interfaces/user";

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

  user: User
  editCurriculumForm : FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private viewCtrl: ViewController, public formBuilder: FormBuilder) {

    this.user = navParams.get('user');

    this.editCurriculumForm = this.formBuilder.group({
      skills: [this.user.skills, Validators.required, ],
      curriculum: [this.user.curriculum, Validators.required],
    
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCurriculumModalPage');
  }

  onSubmit(){

    console.log(this.editCurriculumForm.value);
    
    this.viewCtrl.dismiss(this.editCurriculumForm.value);
    

  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// modal con form per cambiare password

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {

  forgot: boolean;
  activate: boolean;
  inputType: string;
  forgotPssForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl:ViewController, private formBuilder: FormBuilder) {

                this.forgotPssForm = this.formBuilder.group({

                  email: ['', Validators.required],
                  password: ['', Validators.required],
                  repeatpss: ['', Validators.required],
                  activatecode: ['', Validators.required]

                });
  }

  formChange() {
    
        this.forgot = false;
        this.activate = false;
        if(this.inputType === "forgot") this.forgot = true;
        if(this.inputType === "activate") this.activate = true;
      }

  onSubmit(){}

  dismiss() {
    this.viewCtrl.dismiss();
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

}

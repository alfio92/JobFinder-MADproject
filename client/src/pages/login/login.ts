import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams, Events} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuhtenticationProvider } from '../../providers/auhtentication/auhtentication';
import { UserstorageProvider } from '../../providers/userstorage/userstorage';

import { HomePage} from '../home/home';
import { SignupPage } from '../signup/signup';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// pagina di login ( da qui si può andare in "signup" o "forgotpss" )

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  errMess: string;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl : ToastController,
              private formBuilder: FormBuilder, public events: Events,
              private authservice: AuhtenticationProvider,
              private userstorage: UserstorageProvider) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)] ],
      usertype: ['',Validators.required]
    });

   // this.userstorage.clearStorage(); // pulisco lo storage

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSubmit(){
    console.log(this.loginForm.value);

    this.authservice.login(this.loginForm.value)
                    .subscribe( (user) => { 
                                            
                                            this.user = user; 
                                            let data = {usertype : this.user};
                                            
                                            if(this.user == {} || this.user == undefined) {
                                                              this.errMess= "email e password non coincidono";
                                                              console.log(this.errMess);
                                                              this.presentToast(this.errMess, "top");
                                                             // this.navCtrl.setRoot(LoginPage);
                                            }
                                            //se l'utente è stato trovato salva i suoi dati e va in home
                                              else{
                                                console.log(this.loginForm.value.usertype);
                                                this.userstorage.saveData(this.user).then( () => {

                                                        this.userstorage.saveUserType(this.loginForm.value.usertype).then(
                                                          () => { 
                                                              this.events.publish('user:login', this.user, this.loginForm.value.usertype);
                                                              this.navCtrl.setRoot(HomePage, data);
                                                          });                                         
                                            //    this.navCtrl.setRoot(HomePage, data);
                                                        
                                                });
                                              }
                                           },

                                    errMess => {
                                        this.errMess = "Impossibile effettuare il login";
                                        this.presentToast(errMess, "top");
                                    } 

                                          );
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

  openSignup(){

    this.navCtrl.push(SignupPage);

  }

  openForgotpss(){

    this.navCtrl.push(ForgotpasswordPage);
    
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, LoadingController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuhtenticationProvider } from '../../providers/auhtentication/auhtentication';
import { UserstorageProvider } from '../../providers/userstorage/userstorage';

import { googleURL } from '../../interfaces/baseurl';
import { PROVINCE } from '../../interfaces/province';

import { HomePage } from "../home/home";
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
 

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// modal per registrarsi

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;
  signUser: boolean = false;
  signBusiness: boolean = false;
  userType: string;
  province: any = PROVINCE;
  errMess: string;
  verifyBusiness: boolean   //mostra se una data attività esiste oppure no (verificato con google maps)

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
              public toastCtrl: ToastController, public viewCtrl: ViewController, private formBuilder: FormBuilder, private events: Events,
              private authservice: AuhtenticationProvider, private userstorage: UserstorageProvider, private businessLocation : GeolocationProvider) {

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', Validators.required],
      birthdate: ['', Validators.required],
      telnumber: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      repeatpss: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      usertype: ['', Validators.required],
      skills: ['', Validators.required],
      description: ['', Validators.required],
      study: ['', Validators.required],
      curriculum: ['', Validators.required],
      businessname: ['', Validators.required],
      businesstype: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      address: ['', Validators.required]
      

    });


}

signChange() {

    this.signBusiness = false;
    this.signUser = false;
    if(this.userType === "user") this.signUser = true;
    if(this.userType === "business") this.signBusiness = true;

  }

  onSubmit(){
    console.log("ON SUBMIT");
  //utenti
   if(this.authservice.signup(this.signupForm.value) == undefined){
     this.errMess = "email già esistente";
   }
  //attività controllare oltre all'email l'esistenza dell'attività e se questa è già presente nel DB
                    
    else{
          let usertype = this.signupForm.value.usertype;
          
            this.userstorage.saveData(this.signupForm.value).then(
              () => {

                      this.userstorage.saveUserType(usertype).then( () => {

                        // vado nella homepage
                        this.events.publish('user:login');
                        this.dismiss();
                        this.navCtrl.setRoot(HomePage);

                      });
                
              });
           
        }

  }

  dismiss() {
    this.viewCtrl.dismiss();
  } 

  // verifico esistenza attività tramite il web service di google
  nearbySearchApi(){
    
    let name = this.signupForm.value.businessname;
    let type = this.signupForm.value.businesstype;
    let city = this.signupForm.value.city;
    
    if( name == "" || type == "" || city == ""){
      console.log(name + "," + "," + type + "," + city);
      this.presentToast("Per poter verificare l'attività devi inserire prima nel form nome, tipo e città dell'attività");
    }
    else {

      type = type.replace(/,/g, "+");

      //uso loadinCtrl
      let loading = this.loadingCtrl.create({
        content: 'Verifico Attività...'
      });

      loading.present();

      let googleApi = googleURL + "&language=it&query=" + type + "+in+" + city;

      this.businessLocation.getBusinessUserCoordinates(googleApi).subscribe(

        (data) => {

          for (let i = 0; i < data.results.length; i++) {

            let nameFromGoogle = data.results[i].name.toLowerCase();

            if (nameFromGoogle === name.toLowerCase()) { // se da google mi ritorna  che matcha con quello inserito
              this.verifyBusiness = true;
              this.signupForm.value.businessLat = data.results[i].geometry.location.lat;
              this.signupForm.value.businessLong = data.results[i].geometry.location.long;
            }

          }
          loading.dismiss();
          if (this.verifyBusiness) this.presentToast("La tua attività è stata verificata con successo");
          else this.presentToast("Attività non verificata");
        },
        errMess => {

          this.errMess = <any>errMess;
          this.presentToast("Errore impossibile verificare l'attività");
          loading.dismiss();
        }
      );

    }
  }

  presentToast(msg: string){

    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
  
    toast.present();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
   
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, LoadingController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuhtenticationProvider } from '../../providers/auhtentication/auhtentication';
import { UserstorageProvider } from '../../providers/userstorage/userstorage';

import { User } from '../../interfaces/user';
import { BusinessUser } from '../../interfaces/businessuser';
import { HomePage } from "../home/home";
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
  regioni: any;
  selectedRegion: Array<{nome: string, sigla: string}>;
  errMess: string;
  verifyBusiness: boolean   //mostra se una data attività esiste oppure no (verificato con google maps)
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
              public toastCtrl: ToastController, public viewCtrl: ViewController, private formBuilder: FormBuilder, private events: Events,
              private authservice: AuhtenticationProvider, private userstorage: UserstorageProvider) {

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
      region: ['', Validators.required],
      province: ['', Validators.required],
      address: ['', Validators.required]
      
    });

    this.regioni = [{

        nome: "Abruzzo",

        province: [{
          nome: "Chieti",
          sigla: "CH"
        }, {
          nome: "L'Aquila ",
          sigla: "AQ"
        }, {
          nome: "Pescara ",
          sigla: "PE"
        }, {
          nome: "Teramo ",
          sigla: "TE"
        }], 

      },

      {

        nome: "Basilicata",
        province: [{
          nome: "Matera ",
          sigla: "MT"
        }, {
          nome: "Potenza ",
          sigla: "PZ"
        }],

      },
      {

        nome: "Calabria",
        province: [{
          nome: "Catanzaro ",
          sigla: "CZ"
        }, {
          nome: "Cosenza ",
          sigla: "CS"
        }, {
          nome: "Crotone ",
          sigla: "KR"
        }, {
          nome: "Reggio Calabria ",
          sigla: "RC"
        }, {
          nome: "Vibo Valentia ",
          sigla: "VV"
        }],

      },
      {

        nome: "Campania",
        province: [{
          nome: "Avellino ",
          sigla: "AV"
        }, {
          nome: "Benevento ",
          sigla: "BN"
        }, {
          nome: "Caserta ",
          sigla: "CE"
        }, {
          nome: "Napoli ",
          sigla: "NA"
        }, {
          nome: "Salerno ",
          sigla: "SA"
        }],

      },
      {

        nome: "Emilia-Romagna",
        province: [{
          nome: "Bologna ",
          sigla: "BO"
        }, {
          nome: "Ferrara ",
          sigla: "FE"
        }, {
          nome: "Forlì",
          sigla: "FC"
        }, {
          nome: "Modena ",
          sigla: "MO"
        }, {
          nome: "Parma ",
          sigla: "PR"
        }, {
          nome: "Piacenza ",
          sigla: "PC"
        }, {
          nome: "Ravenna ",
          sigla: "RA"
        }, {
          nome: "Reggio Emilia ",
          sigla: "RE"
        }, {
          nome: "Rimini ",
          sigla: "RN"
        }],

      },
      {

        nome: "Friuli-Venezia Giulia",
        province: [{
          nome: "Gorizia ",
          sigla: "GO"
        }, {
          nome: "Pordenone ",
          sigla: "PN"
        }, {
          nome: "Trieste ",
          sigla: "TS"
        }, {
          nome: "Udine ",
          sigla: "UD"
        }],

      },
      {
        nome: "Lazio",
        province: [{
          nome: "Frosinone ",
          sigla: "FR"
        }, {
          nome: "Latina ",
          sigla: "LT"
        }, {
          nome: "Rieti ",
          sigla: "RI"
        }, {
          nome: "Roma ",
          sigla: "RM"
        }, {
          nome: "Viterbo ",
          sigla: "VT"
        }],

      }, {

        nome: "Liguria",
        province: [{
          nome: "Genova ",
          sigla: "GE"
        }, {
          nome: "Imperia ",
          sigla: "IM"
        }, {
          nome: "La Spezia ",
          sigla: "SP"
        }, {
          nome: "Savona ",
          sigla: "SV"
        }],

      },
      {

        nome: "Lombardia",
        province: [{
          nome: "Bergamo ",
          sigla: "BG"
        }, {
          nome: "Brescia ",
          sigla: "BS"
        }, {
          nome: "Como ",
          sigla: "CO"
        }, {
          nome: "Cremona ",
          sigla: "CR"
        }, {
          nome: "Lecco ",
          sigla: "LC"
        }, {
          nome: "Lodi ",
          sigla: "LO"
        }, {
          nome: "Mantova ",
          sigla: "MN"
        }, {
          nome: "Milano ",
          sigla: "MI"
        }, {
          nome: "Pavia ",
          sigla: "PV"
        }, {
          nome: "Sondrio ",
          sigla: "SO"
        }, {
          nome: "Varese ",
          sigla: "VA"
        }],

      },
      {

        nome: "Marche",
        province: [{
          nome: "Ancona ",
          sigla: "AN"
        }, {
          nome: "Ascoli Piceno ",
          sigla: "AP"
        }, {
          nome: "Macerata ",
          sigla: "MC"
        }, {
          nome: "Pesaro e Urbino ",
          sigla: "PU"
        }],

      },
      {

        nome: "Molise",
        province: [{
          nome: "Campobasso ",
          sigla: "CB"
        }, {
          nome: "Isernia ",
          sigla: "IS"
        }],

      },
      {

        nome: "Piemonte",
        province: [{
          nome: "Alessandria ",
          sigla: "AL"
        }, {
          nome: "Asti ",
          sigla: "AT"
        }, {
          nome: "Biella ",
          sigla: "BI"
        }, {
          nome: "Cuneo ",
          sigla: "CN"
        }, {
          nome: "Novara ",
          sigla: "NO"
        }, {
          nome: "Torino ",
          sigla: "TO"
        }, {
          nome: "Verbano-Cusio-Ossola ",
          sigla: "VB"
        }, {
          nome: "Vercelli ",
          sigla: "VC"
        }]

      },
      {

        nome: "Puglia",
        province: [{
          nome: "Bari ",
          sigla: "BA"
        }, {
          nome: "Brindisi ",
          sigla: "BR"
        }, {
          nome: "Foggia ",
          sigla: "FG"
        }, {
          nome: "Lecce ",
          sigla: "LE"
        }, {
          nome: "Taranto ",
          sigla: "TA"
        }],

      },
      {

        nome: "Sardegna",
        province: [{
          nome: "Cagliari ",
          sigla: "CA"
        }, {
          nome: "Carbonia-Iglesias ",
          sigla: "CI"
        }, {
          nome: "Nuoro ",
          sigla: "NU"
        }, {
          nome: "Olbia-Tempio ",
          sigla: "OT"
        }, {
          nome: "Oristano ",
          sigla: "OR"
        }, {
          nome: "Medio Campidano ",
          sigla: "VS"
        }, {
          nome: "Sassari ",
          sigla: "SS"
        }, {
          nome: "Ogliastra ",
          sigla: "OG"
        }],

      },

      {

        nome: "Sicilia",
        province: [{
          nome: "Agrigento ",
          sigla: "AG"
        }, {
          nome: "Caltanissetta ",
          sigla: "CL"
        }, {
          nome: "Catania ",
          sigla: "CT"
        }, {
          nome: "Enna ",
          sigla: "EN"
        }, {
          nome: "Messina ",
          sigla: "ME"
        }, {
          nome: "Palermo ",
          sigla: "PA"
        }, {
          nome: "Ragusa ",
          sigla: "RG"
        }, {
          nome: "Siracusa ",
          sigla: "SR"
        }, {
          nome: "Trapani ",
          sigla: "TP"
        }]

      },
      {

        nome: "Toscana",
        province: [{
          nome: "Arezzo ",
          sigla: "AR"
        }, {
          nome: "Firenze ",
          sigla: "FI"
        }, {
          nome: "Grosseto ",
          sigla: "GR"
        }, {
          nome: "Livorno ",
          sigla: "LI"
        }, {
          nome: "Lucca ",
          sigla: "LU"
        }, {
          nome: "Massa-Carrara ",
          sigla: "MS"
        }, {
          nome: "Pisa ",
          sigla: "PI"
        }, {
          nome: "Pistoia ",
          sigla: "PT"
        }, {
          nome: "Prato ",
          sigla: "PO"
        }, {
          nome: "Siena ",
          sigla: "SI"
        }],

      },
      {

        nome: "Trentino-Alto Adige",
        province: [{
          nome: "Bolzano ",
          sigla: "BZ"
        }, {
          nome: "Trento ",
          sigla: "TN"
        }],

      },
      {

        nome: "Umbria",
        province: [{
          nome: "Perugia ",
          sigla: "PG"
        }, {
          nome: "Terni ",
          sigla: "TR"
        }]

      },
      {

        nome: "Valle d'Aosta",
        province: [{
          nome: "Aosta ",
          sigla: "AO"
        }],

      },

      {

        nome: "Veneto",
        province: [{
          nome: "Belluno ",
          sigla: "BL"
        }, {
          nome: "Padova ",
          sigla: "PD"
        }, {
          nome: "Rovigo ",
          sigla: "RO"
        }, {
          nome: "Treviso ",
          sigla: "TV"
        }, {
          nome: "Venezia ",
          sigla: "VE"
        }, {
          nome: "Verona ",
          sigla: "VR"
        }, {
          nome: "Vicenza ",
          sigla: "VI"
        }],

      },

    ];

}

  signChange() {

    this.signBusiness = false;
    this.signUser = false;
    if(this.userType === "user") this.signUser = true;
    if(this.userType === "business") this.signBusiness = true;
  }

  selectRegion(regione: string){

    for(let i=0; i<this.regioni.length; i++){

      if(regione === this.regioni[i].nome) this.selectedRegion = this.regioni[i].province;

    }

    console.log(this.selectedRegion);
  }

  onSubmit(){

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

  nearbySearchApi(name, type, city, address){

    //uso loadinCtrl
    let googleApi = 'http:\\'
    //mostro toastCtrl 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
   
  }

}

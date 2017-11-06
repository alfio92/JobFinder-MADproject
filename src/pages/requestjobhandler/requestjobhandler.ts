import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RequestjobhandlerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// pagina in cui un attività può gestire le richieste per un certo annuncio (accettazione/rifiuto di un utente)

@IonicPage()
@Component({
  selector: 'page-requestjobhandler',
  templateUrl: 'requestjobhandler.html',
})
export class RequestjobhandlerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestjobhandlerPage');
  }

}

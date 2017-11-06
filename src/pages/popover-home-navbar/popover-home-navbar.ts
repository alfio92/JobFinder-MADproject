import { Component } from '@angular/core';
import { IonicPage, ViewController, Events } from 'ionic-angular';

/**
 * Generated class for the PopoverHomeNavbarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// Mostra il range che l'utente dà in input per calcolare la distanza dai luoghi di lavoro 
@IonicPage()
@Component({
  selector: 'page-popover-home-navbar',
  templateUrl: 'popover-home-navbar.html',
})
export class PopoverHomeNavbarPage {

  range: number = 5;

  constructor(public viewCtrl: ViewController, private events: Events) {}
  
  setRange(){
    this.events.publish('range:popoverhomenavbar', this.range);
  }

    close() {
      this.viewCtrl.dismiss();
    }
}

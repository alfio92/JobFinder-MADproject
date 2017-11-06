import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Job } from '../../interfaces/job';
import { User } from '../../interfaces/user';
import { JobRequest } from '../../interfaces/jobrequest';

import { ProfilePage } from '../profile/profile';

import { Geolocation } from '@ionic-native/geolocation';

import { UserstorageProvider } from '../../providers/userstorage/userstorage';
import { JobProvider } from '../../providers/job/job';
import { JobrequestProvider } from '../../providers/jobrequest/jobrequest';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker,
  GoogleMapOptions
 } from '@ionic-native/google-maps';

/**
 * Generated class for the JobPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// mostra tutti i dati di un annuncio
@IonicPage()
@Component({
  selector: 'page-job',
  templateUrl: 'job.html',
})
export class JobPage {

  job:Job;
  user: User;
  jobrequest: JobRequest[];
  myPosition: any;
  errMess: string;
  sended: boolean;
  selectedSegment: string;
  map: GoogleMap;
  mapElement: HTMLElement;

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps,
              private jobrequestservice: JobrequestProvider, private geo: Geolocation, 
              private userstorageservice: UserstorageProvider, public toastCtrl: ToastController,
              @Inject('BaseURL') private BaseURL ) {
          
          this.job = navParams.get('job');
          this.user = navParams.get('user');      // se undefined , prendo i dati dal localstorage
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobPage  '+this.user);
    this.selectedSegment = "detail";

   
    if( this.myPosition == undefined) this.getDeviceCoords();

    //controllo se l'utente loggato ha già inviato la sua candidatura al server
    if( this.user != undefined){    //utente passato tra i parametri di navigazione
        this.controlRequestSended();

       // ottengo le coordinate geo. del device
        this.getDeviceCoords();
    }
      else{
            this.userstorageservice.fetchUsertype().then((usertype) => {
                                              
                    if(usertype === 'user') {   // se il tipo di utente loggato non è quello di un attività 
                                      this.getUserFromStorage();
                                        // ottengo le coordinate geo. del del device
                                          this.getDeviceCoords();
                                    }
                  });
            
      }
  }

  sendJobRequest(){

    let request : JobRequest;

    request.userId = this.user.id;
    request.jobadId = this.job.id;
    request.nameuser = this.user.name;
    request.surnameuser = this.user.surname;
    request.date = this.getDate();
    request.imageuser = this.user.image;
    request.status = 'noreply';

    this.jobrequestservice.postJobRequest(request).subscribe(
      res => {
                if( res != null) this.presentToast("La tua candidatura è stata inviata", "top");
                    else this.presentToast("Candidatura non inviata", "top");
              },
      errMess => this.errMess = <any>errMess
    );    

  }
  
   //ottiene la data, 
   getDate() : string{
    
          let date = new Date();
          let day = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear().toString().substr(-2);
    
          return day + '/' + month + '/' + year; 
    
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

 // ritorna le coordinate del device
 getDeviceCoords(){
  
  let optionsGPS = {timeout: 4000, enableHighAccuracy: true}; 
  this.geo.getCurrentPosition(optionsGPS).then((result) => {

        this.myPosition.lat = result.coords.latitude; 
        this.myPosition.lng = result.coords.longitude;

      }).catch((err) => {
       this.presentToast("Attiva il GPS", "top");
    }); 

}

  // vado nel profilo cliccato
  goToProfilePage(id){
    
        this.navCtrl.push(ProfilePage, {
    
            profile: id,
            myId: this.user.id ? this.user.id : ''
        });
    
  }

  // controllo se l'utente loggato ha già
  controlRequestSended(){

    this.jobrequestservice.controlUserAlreadySendedReq(this.user.id, this.job.id).subscribe(
      jobreq => {
                  if(jobreq == null) this.sended = true;
                    else this.sended = false;
                },
      errMess => this.errMess = <any>errMess

    );

  }

  // prendo i dati dell'utente loggato dal local storage
  getUserFromStorage(){

    this.userstorageservice.fetchLoggedUser().then(
      user => {
                this.user = user,
                this.controlRequestSended();
              },

      errMess => this.errMess = <any>errMess
    )

  }


  loadMap(){

     // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>
   
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
    
     let map: GoogleMap = this.googleMaps.create(element);
    
     // listen to MAP_READY event
     // You must wait for this event to fire before adding something to the map or modifying it in anyway
     map.one(GoogleMapsEvent.MAP_READY).then(
       () => {
         console.log('Map is ready!');
         // Now you can add elements to the map like the marker
       }
     );
    
    
 
   this.mapElement = document.getElementById('map');
   
     //posiziona la camera della mappa sulle coordinate dell'utente
       let mapOptions: GoogleMapOptions = {
         camera: {
           target: {
             lat: this.myPosition.lat,
             lng: this.myPosition.lng
           },
           zoom: 18,
           tilt: 30
         }
       };
   
       this.map = this.googleMaps.create(this.mapElement, mapOptions);
   
       // Wait the MAP_READY before using any methods.
       this.map.one(GoogleMapsEvent.MAP_READY)
         .then(() => {
           console.log('Map is ready!');
   
           // aggiunge il marker dell'utente
           this.map.addMarker({
               title: 'Ionic',
               animation: 'DROP',
               position: {
                 lat: this.myPosition.lat,
                 lng: this.myPosition.lng
               }
             })
             .then(marker => {
               marker.on(GoogleMapsEvent.MARKER_CLICK)
                 .subscribe(() => {
                   alert('clicked');
                 });

                 // aggiunge il marker relativo all'annuncio
                 let jobPos : any;

                 jobPos.lat = this.job.businesslat;
                 jobPos.lng = this.job.businesslng;
   
                 this.map.addMarker({
                  title: 'Ionic',
                  icon: 'blue',
                  animation: 'DROP',
                  position: {
                    lat: jobPos.lat,
                    lng: jobPos.lng
                  }
                })
                .then(marker => {
                  marker.on(GoogleMapsEvent.MARKER_CLICK)
                    .subscribe(() => {
                      alert('clicked');
                    });
                  this.drawPolyline(jobPos);
             });
   
         });

        });
    }

  drawPolyline(jobPos){

    

  }

}

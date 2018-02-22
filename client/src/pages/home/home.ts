import { Component, Inject} from '@angular/core';
import { NavController, NavParams, ToastController, PopoverController, LoadingController, Events } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Job } from '../../interfaces/job';
import { JobRequest } from '../../interfaces/jobrequest';
import { baseURL} from '../../interfaces/baseurl';
import { User } from '../../interfaces/user';
import { BusinessUser } from '../../interfaces/businessuser';

import { UserstorageProvider } from '../../providers/userstorage/userstorage';
import { JobrequestProvider} from '../../providers/jobrequest/jobrequest';
import { JobProvider } from '../../providers/job/job';
import { Geolocation } from '@ionic-native/geolocation';

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

import { JobPage } from "../job/job";
import { ProfilePage } from "../profile/profile";
import { PopoverHomeNavbarPage } from "../popover-home-navbar/popover-home-navbar";


// mostra tutti gli annunci delle attività più vicine all'utente con mappa in cui vi sono i vari marker(segment UI)

// trovo le mie coordinate alla mia coordinata aggiungo il grado relativo ai km da coprire
// trova gli annunci presenti entro quei km 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


   // myPosition : { lat: number, lng: number};
    myPosition : any
    jobs : Job[];     // annunci di lavoro
    businessuser: BusinessUser; 
    user: User; 
    usertype: string;
    selectedSegmentUser: string;  // segment per l'utente che cerca lavoro
    selectedSegmentBusiness: string; // segment per l'utente attività
    jobAdForm: FormGroup;
    jobsErrMess: string;
    jobAdRequests: JobRequest[];
    isToggle: boolean[] = [];
    acceptedCandNum: number[] = [];
    allLoaded: boolean = false;
    map: GoogleMap;
    mapElement: HTMLElement;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,  private googleMaps: GoogleMaps,
              private jobservice: JobProvider, private jobrequestservice: JobrequestProvider, public loadingCtrl: LoadingController,
              public event: Events, private geo:Geolocation, public userstorage: UserstorageProvider, 
              private popoverCtrl:PopoverController, private toastCtrl: ToastController, private formBuilder: FormBuilder,
              
              @Inject('BaseURL') private BaseURL ) {
    
                 //creo il form per creare l'annuncio di lavoro
                    this.jobAdForm = this.formBuilder.group({
                            
                        jobtype : ['', Validators.required],
                        numpositions: ['', [Validators.required, Validators.pattern]],
                        cash: ['', [Validators.required, Validators.pattern]],
                        initperiod: ['', Validators.required],
                        endperiod: ['', Validators.required],
                        initday: ['', Validators.required],
                        endday: ['', Validators.required],
                        inittime: ['', Validators.required],
                        endtime: ['', Validators.required],
                        extra: 'false',
                        description: ''
                    });

                    // aggiorna gli annunci sulla home in base al range dato in input
                    event.subscribe('range:popoverhomenavbar', (range) => {
                          
                            this.jobs = [];
                            this.getNearestJobs(range);

                      });
                
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    this.userstorage.fetchUsertype().then( (usertype) => {
      
                this.usertype = usertype;
      
                if (this.usertype === 'business'){

                  this.userstorage.fetchLoggedUser().then(
                    (businessuser) => {
      
                                this.businessuser = JSON.parse(businessuser);
                                this.selectedSegmentBusiness = 'myads';
                                this.getMyJobAds();
                              
                    });
                }  
           
                if(this.usertype=== 'user'){
                  this.userstorage.fetchLoggedUser().then(
                    (user) => {
      
                          this.user = JSON.parse(user);
                          this.selectedSegmentUser = 'adsbypos';
                          this.getDeviceCoords(); // ottengo le coordinate dell'utente
                                    
                  }); 
                
                }        
      
          });
            
   
  }

// ritorna le coordinate del device
  getDeviceCoords(){
    
    let optionsGPS = {timeout: 4000, enableHighAccuracy: true}; 
    this.geo.getCurrentPosition(optionsGPS).then((result) => {
      
      this.myPosition = result.coords;
      this.myPosition.lat = result.coords.latitude;     
      this.myPosition.lng = result.coords.longitude; 
      console.log(this.myPosition.lat+"  "+this.myPosition.lng);

      this.getNearestJobs(5); // raggio di 5 km di default

        }).catch((err) => {
         this.presentToast("Attiva il GPS", "top");
      }); 
  
  }

  loadMap() {
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
  
          // Now you can use all methods safely.
          this.map.addMarker({
              title: 'Ionic',
              icon: 'red',
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
                // dopo aver aggiunto il marker dell'utente aggiunge i marker relativi agli annunci
                this.addJobAdsMarker();

            });
  
        });

     
    }
   // aggiunge tutti i marker relativi agli annunci delle attività che l'utente vede
    addJobAdsMarker(){

      for(let i=0; i<this.jobs.length; i++){
        
          let lat = this.jobs[i].businesslat;
          let lng = this.jobs[i].businesslng;
        
          this.map.addMarker({
            title: this.jobs[i].businessname,
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: lat,
              lng: lng
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe( () => {
                alert('clicked');
              });

         //     this.addInfoWindowToMarker(marker);
            })
        
      }

    }

  /*  addInfoWindowToMarker(marker) {
      let infoWindowContent = '<div id="content"><h1 id="firstHeading" class="firstHeading">' + marker.title + '</h1></div>';
      let infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
      });
      marker.addListener('click', () => {
        this.closeAllInfoWindows();
        infoWindow.open(this.map, marker);
      });
      this.infoWindows.push(infoWindow);
    }

    closeAllInfoWindows() {
      for(let window of this.infoWindows) {
        window.close();
      }
    }
     */

    // posta l'annuncio
    onSubmit(){

      console.log(this.jobAdForm.value);
      
      this.jobAdForm.value.iduser = this.businessuser.id;
      this.jobAdForm.value.businessname = this.businessuser.businessname;
      this.jobAdForm.value.businesstype = this.businessuser.businesstype; 
      this.jobAdForm.value.businesscity = this.businessuser.businesscity;
      this.jobAdForm.value.businessprov = this.businessuser.businessprov;
      this.jobAdForm.value.businessaddress = this.businessuser.businessaddress;
      this.jobAdForm.value.businesslat = this.businessuser.businesslat;
      this.jobAdForm.value.businesslong = this.businessuser.businesslong;
      this.jobAdForm.value.businessphonenum = this.businessuser.telnumber;
      this.jobAdForm.value.businessimage = this.businessuser.image;
      this.jobAdForm.value.insertdate = this.getDate();
      this.jobAdForm.value.expired = false;

      let loading = this.loadingCtrl.create({
        
        content: "Pubblicazione annuncio"
          
      });

     this.jobservice.postJob(this.jobAdForm.value, this.businessuser).subscribe(

              data => {
                        this.jobs.push(data);
                        console.log(data);

                        loading.dismiss();
                        this.presentToast("Annuncio pubblicato", "top");

                        this.selectedSegmentBusiness = 'myads';
                      },
              err => console.log(err)
      ); 
      loading.present();
      
    }

    // inizializzo l'array che mi definisce gli annunci 
    initIsToggle() {

      console.log(this.jobs + "  " + this.jobs.length);
      let length = this.jobs.length;

      for (let i = 0; i < length; i++) {
        this.isToggle[i] = false;
      }

    }

    presentToggle(index){
   //   let index = this.jobs.indexOf(id);
      console.log(index); 
      if(!this.isToggle[index])
          this.isToggle[index] = true;
            else this.isToggle[index] = false;
    for(let i=0; i<this.isToggle.length; i++){console.log(this.isToggle[i]);}
     
    }

    // mostra un popover da un click
    presentPopover(event){

      let popover = this.popoverCtrl.create(PopoverHomeNavbarPage);
      popover.present({
        ev: event
      });

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

    //ottiene la data, 
    getDate() : string{

      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear().toString().substr(-2);

      return day + '/' + month + '/' + year; 

    }

     // invia risposta alla candidatura di un dato annuncio
     sendReplyToRequest(id, reqIndex, adIndex, reply){

          this.jobs[adIndex].jobrequests[reqIndex].status = reply; 
          this.jobrequestservice.replyJobRequest(this.jobs[adIndex].jobrequests[reqIndex]).subscribe(
            requests => {
                    //    if(reply === 'accepted') this.acceptedCandNum[adIndex]++;
                    /*
                        if( requests == null){ this.jobs[adIndex].jobrequests = [];}
                          else 
                              this.jobs[adIndex].jobrequests = requests;
                    */
                   //   let index = this.jobs[adIndex].indexOf(id);
                    if (reqIndex >= 0) {
                      this.jobs[adIndex].jobrequests.splice(reqIndex,1); // elimino dalla lista
                    }

                      //    console.log(this.jobs[adIndex].jobrequests);
                         this.presentToast("Risposta alla candidatura avvenuta con successo", "top");
                         this.isJobAdComplete(adIndex);
                       },
           errMess => this.jobsErrMess = <any>errMess
         ); 

     }

    // controllo se l'annuncio è scaduto(se il numero di posizioni per il dato annuncio soddisfa le candidature accettate)
    isJobAdComplete(index){

      let numpos = this.jobs[index].numpositions;
      let requests = this.jobs[index].jobrequests;
      let length = this.jobs[index].jobrequests.length;
      let numAccReq = 0;

      for(let i=0; i<length; i++){
        if( requests[i].status == 'accepted') numAccReq++;
      }
        if(numAccReq == numpos){

          this.jobs[index].expired = true;
          this.expiredJobAd(this.jobs[index]);
        }

    }

    // dico al server che l'annuncio è scaduto, se la chiamata va a buon fine aggiorno la pagina con gli annunci attivi
    expiredJobAd(job){

      this.jobservice.jobAdExpired(job).subscribe(
        requests => {

                  this.presentToast("L'annuncio è completo", "top");
                  this.getMyJobAds();

                  },
        errMess => this.jobsErrMess = <any>errMess
      );
      
    }

    //ottiene gli annunci delle attività più vicine alla posizione dell'utente
    getNearestJobs(kmRange : number){
      //this.getDeviceCoords();
      this.jobservice.getJobAds(/*lat, lng, range*/).subscribe(

                        jobs =>{ 
                                if( jobs == null) this.jobs=[];
                                  else{
                                      this.jobs=jobs;
                                      this.allLoaded = true;
                                  }
                                },
                        errmess => this.jobsErrMess = <any>errmess

                      );
    }

    //ottiene gli annunci postati dall'attività loggata
    getMyJobAds(): any {
      this.jobservice.getJobAdsByBusinessUser(this.businessuser.id).subscribe(
      
        jobs => { if( jobs == null) this.jobs=[]
                      else{
                            this.jobs = jobs;  
                            this.getRequestsToJobAd();
                            this.initIsToggle(); 
                         }
               },
        errMess => this.jobsErrMess = <any>errMess 
          
      );
      
    }

    //ottiene tutte le candidature inviate al dato annuncio
    getRequestsToJobAd(){

      for(let i = 0; i< this.jobs.length; i++){

        this.jobrequestservice.getJobRequestByJobAd(this.jobs[i].id).subscribe(
          jobrequests =>{                     
                          this.jobs[i].jobrequests = jobrequests;
                          this.countAcceptedCandNum(this.jobs[i].jobrequests, i);
                          if( i == this.jobs.length-1 || this.jobs.length == 0) this.allLoaded = true;

                        },
          errMess => this.jobsErrMess = <any>errMess 

        );
       
      }

    }

  countAcceptedCandNum(jobreqs, index) {

    this.acceptedCandNum[index] = 0;
    for (let j = 0; j < jobreqs.length; j++) {

      if (jobreqs[j].status === 'accepted')
        this.acceptedCandNum[index]++;
    }
    /*
      for(let i = 0; i<jobs.length; i++){
        for(let j=0; j<jobs[i].jobrequests.length; j++){
          if(jobs[i].jobrequests[j].status === 'accepted')
            this.jobs[i].acceptedReqs++;
        }
      }
    */


  }

    // vai alla pagina dell'annuncio selezionato
    goToJobAdSelected(event, job){
      this.navCtrl.push(JobPage, {
        job: job,
        user: this.user,
        pos: this.myPosition
      });
    }

    // vado nella pagina del profilo selezionato
    goToProfileSelected(event, request){
      let id;
      if(this.user == undefined) id = this.businessuser.id;
          else id = this.user.id

      console.log(request.userId+" ID REQUEST");
      this.navCtrl.push(ProfilePage, {
        profile: request.userId,
        myId: id
      });

    }
}

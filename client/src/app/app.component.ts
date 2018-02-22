import { Component, ViewChild, Inject } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { User } from '../interfaces/user';
import { BusinessUser } from '../interfaces/businessuser';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { JobPage } from '../pages/job/job';
import { LoginPage } from '../pages/login/login';
import { JobadslistPage } from '../pages/jobadslist/jobadslist';
import { JobrequestlistPage } from '../pages/jobrequestlist/jobrequestlist';
import { UserstorageProvider } from "../providers/userstorage/userstorage";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{title: string, icon: string, component: any, parameter?: any}>;
  usertype: string;
  user: User;
  businessuser: BusinessUser;
  imageUrl: string;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private userstorage: UserstorageProvider, public events: Events,
              @Inject('BaseURL') private BaseURL) {

    this.initializeApp();

    //controllo per stabilire la pagina init "LoginPage" op. "HomePage"
    this.userstorage.fetchUsertype().then(
      (usertype) => {

         console.log(" APP "+ usertype);
         

         if( usertype !== '' && usertype !== null && usertype !== undefined ){

                 this.usertype = usertype;
                 this.setMenuByUserType();
                 this.nav.setRoot(HomePage);
               }   
                 else this.nav.setRoot(LoginPage);
      });     //prendo il tipo di utente dal local storage

                  
    events.subscribe('user:login', (user, usertype) => {

      if(usertype === 'business') this.businessuser = user;
          else this.user = user;

        this.usertype = usertype;
        this.setMenuByUserType();
   });
  
  }

  setMenuByUserType(){
    
    // modifica la UI per l'utente 'attività'
    if( this.usertype === 'business' ) {
    
        // prendo i dati dell'utente dal local storage

        this.userstorage.fetchLoggedUser().then( (businessuser) => {

                  this.businessuser = JSON.parse(businessuser);
                 
                    //imposto il menu
                  this.pages = [
                    {title: 'Home', icon:'home', component: HomePage, parameter: ''},
                    {title: 'Annunci Attivi', icon:'paper', component: JobadslistPage, parameter: this.businessuser.id },
                    {title: 'Annunci Scaduti', icon:'news', component: JobadslistPage, parameter: this.businessuser.id },
                    {title: 'Logout', icon:'log-out', component: LoginPage, parameter: ''}
                    ];
                  
        });

    }

    // modifica la UI per l'utente che cerca lavoro
    if( this.usertype === 'user' ){

        // prendo i dati dell'utente dal local storage
        this.userstorage.fetchLoggedUser().then( (user) => {
          
                    this.user = JSON.parse(user);
                    console.log(this.usertype+","+this.user);

                    //imposto il menu
                    this.pages = [
                      {title: 'Home', icon:'home', component: HomePage, parameter: ''},
                      {title: 'Candidature', icon:'news', component: JobrequestlistPage, parameter: this.user.id},
                      {title: 'Logout', icon:'log-out', component: LoginPage, parameter: ''}
                      ];
                      
                  });
    } 

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: any) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title === 'Logout'){
               this.logout();
               return;
    }

    this.nav.setRoot(page.component,{ parameter: page.parameter});
  }

  openProfile(){
    // cosa apre per i business user ???
  //  this.nav.push(ProfilePage, {user : this.user ? this.user : this.businessuser});
  console.log(this.user)
  console.log(this.user.id)
  console.log(this.user.name)
  console.log(this.user.surname)
  console.log(this.user.email)

  this.userstorage.fetchLoggedUser().then();
  if( this.user != undefined) this.nav.push(ProfilePage, {profile: this.user.id, myId: this.user.id});

  }

  //openGallery(){}

  logout(){
    //cancello tutto da this.storage
    this.userstorage.clearStorage().then(

      () =>  this.nav.setRoot(LoginPage)

    );
    
  }
}

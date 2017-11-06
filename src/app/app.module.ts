import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
//import { File } from 'plugins/cordova-plugin-file';
//import { Transfer } from '@ionic-native/transfer';

import { baseURL } from '../interfaces/baseurl';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { JobPage } from '../pages/job/job';
import { ProfilePage } from '../pages/profile/profile';
import { JobrequestlistPage } from "../pages/jobrequestlist/jobrequestlist";
import { RequestjobhandlerPage } from "../pages/requestjobhandler/requestjobhandler";
import { JobadslistPage } from "../pages/jobadslist/jobadslist";
import { PopoverHomeNavbarPage } from "../pages/popover-home-navbar/popover-home-navbar";
import { JobadPopoverPage } from '../pages/jobad-popover/jobad-popover';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuhtenticationProvider } from '../providers/auhtentication/auhtentication';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { ProcessHttpMsgProvider } from '../providers/process-http-msg/process-http-msg';
import { JobProvider } from '../providers/job/job';
import { UserProvider } from '../providers/user/user';
import { BusinessuserProvider } from '../providers/businessuser/businessuser';
import { ProfileProvider } from '../providers/profile/profile';
import { UserstorageProvider } from '../providers/userstorage/userstorage';
import { JobrequestProvider } from '../providers/jobrequest/jobrequest';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ForgotpasswordPage,
    JobPage,
    ProfilePage,
    JobrequestlistPage,
    RequestjobhandlerPage,
    JobadslistPage,
    PopoverHomeNavbarPage,
    JobadPopoverPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ForgotpasswordPage,
    JobPage,
    ProfilePage,
    JobrequestlistPage,
    RequestjobhandlerPage,
    JobadslistPage,
    PopoverHomeNavbarPage,
    JobadPopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: 'BaseURL', useValue: baseURL},
    AuhtenticationProvider,
    GeolocationProvider,
    ProcessHttpMsgProvider,
    JobProvider,
    UserProvider,
    BusinessuserProvider,
    GoogleMaps,
    ProfileProvider,
    UserstorageProvider,
    Geolocation,
    JobrequestProvider
  ]
})

export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from "../pages/home/home";
import { environment } from '../environment/environment';


import { MyApp } from './app.component';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CampusProvider } from '../providers/campus/campus';
import { EmployeesProvider } from '../providers/employees/employees';

@NgModule({
  declarations: [
    MyApp,
    HomePage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp( environment.firebase ),
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationProvider,
    CampusProvider,
    EmployeesProvider
  ]
})
export class AppModule {}

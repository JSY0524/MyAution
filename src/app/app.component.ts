import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsControllerPage } from '../pages/tabs/tabs-controller';

import firebase from 'firebase';

import { FIREBASE_CREDENTIALS } from './credentials';
import { HomePage } from '../pages/home/home';
import { LogInPage } from '../pages/log-in/log-in'

//import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LogInPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp(FIREBASE_CREDENTIALS);
    /*const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if(!user){
        this.rootPage='LogInPage';
        unsubscribe();
      }
      else{
        this.rootPage = 'LogInPage';
        unsubscribe();
      }
    });*/
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
           
    });
  }
}

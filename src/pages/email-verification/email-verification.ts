import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LogInPage } from '../log-in/log-in';
import { SignUpPage } from '../sign-up/sign-up';

@Component({
  selector: 'page-email-verification',
  templateUrl: 'email-verification.html'
})
export class EmailVerificationPage {

  constructor(public navCtrl: NavController) {
  }

  saveNewAccount(params){
    if (!params) params = {};
    this.navCtrl.push(LogInPage);
  }
}

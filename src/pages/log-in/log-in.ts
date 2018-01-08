import { Component } from '@angular/core';
import { NavController, Loading, LoadingController, Alert, AlertController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { TabsControllerPage } from '../tabs/tabs-controller'

import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth'

@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html'
})
export class LogInPage {

  public logInForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, formBuilder: FormBuilder, public authProvider: AuthProvider, public alertCtrl : AlertController, public loadingCtrl: LoadingController) {
    this.logInForm = formBuilder.group({
      email : [
        '', 
        Validators.compose([Validators.minLength(4), Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]'), Validators.required])
      ],
      pwd : [
        '', 
        Validators.compose([Validators.minLength(8), Validators.required])
      ]
    }); //sign in Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}')
  }

  goToBoard(){
    if(this.logInForm.valid) this.navCtrl.push(TabsControllerPage);
  }

  goToSignUp(){
    this.navCtrl.push(SignUpPage);
  }

  logInUser(email, password):void{
    /*if (!this.logInForm.valid) {
      console.log(`Form is not valid yet, current value: ${this.logInForm.value}`);
    } 
    else {
    const email = this.logInForm.value.email;
    const password = this.logInForm.value.password;
    */
    this.authProvider.logInUser(email, password).then(authData => {
        console.log(authData);
        this.loading.dismiss().then(() => {
          if(!authData.emailVerified){
            this.authProvider.logoutUser();
            console.log(`이메일 인증하세요`);
          }
          else{
            this.navCtrl.setRoot(TabsControllerPage);
          }
        });
      },
      error => {
        this.loading.dismiss().then(() => {
          const alert: Alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }]
          });
          alert.present();
        });
      });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    }
}

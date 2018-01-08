import { Component } from '@angular/core';
import { NavController, Loading, LoadingController, Alert, AlertController } from 'ionic-angular';
import { EmailVerificationPage } from '../email-verification/email-verification';
import { AuthProvider } from '../../providers/auth/auth';
import { LogInPage } from '../log-in/log-in';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})

export class SignUpPage {

  public signUpForm: FormGroup;
  public loading: Loading;
  public passErr: boolean = null;

  constructor(public navCtrl: NavController,formBuilder: FormBuilder, public authProvider: AuthProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.signUpForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]'), Validators.required])
      ],
      phone: [
        '',
        Validators.compose([Validators.pattern('[0][1][0-9]{8,9}'), Validators.required])
      ],
      pwd: [
        '', 
        Validators.compose([Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).{8,}$'), Validators.minLength(8), Validators.required])
      ],
      confirmPwd: [
        '',
        Validators.compose([Validators.required])
      ]
    });
  }

  goToEmailVerif(params){
    this.navCtrl.push(EmailVerificationPage);
  }

  signUpUser(email, phone, password): void { 
    console.log(email, password);
    this.authProvider.signUpUser(email, phone, password).then( user => 
    { 
      this.loading.dismiss().then(() => { 
        this.navCtrl.setRoot(LogInPage); 
      }); 
    }, 
    error => { 
      this.loading.dismiss().then(() => { 
        const alert: Alert = this.alertCtrl.create({ 
          message: error.message, 
          buttons: [{ text: "Ok", role: "cancel" }]
        }); 
          
        alert.present(); 
      }); 
    }); 

    this.loading = this.loadingCtrl.create(); 
    this.loading.present(); 
  }
}


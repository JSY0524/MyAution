import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmailValidator } from '../../validators/email'; 
import { AuthProvider } from '../../providers/auth/auth'; 

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  public resetPasswordForm: FormGroup;

  constructor( public navCtrl: NavController, public authProvider: AuthProvider, public alertCtrl: AlertController, formBuilder: FormBuilder ) { 
    this.resetPasswordForm = formBuilder.group({ 
      email: [ 
        "", 
        Validators.compose([Validators.required, EmailValidator.isValid]) ] 
    }); 
  }

  resetPassword(): void { 
    if (!this.resetPasswordForm.valid) { 
      console.log( `Form is not valid yet, current value: ${this.resetPasswordForm.value}` ); 
    } 
    else { 
      const email: string = this.resetPasswordForm.value.email; 
      this.authProvider.resetPassword(email).then( user => { 
        const alert: Alert = this.alertCtrl.create({ 
          message: "Check your email for a password reset link", buttons: [ { text: "Ok", role: "cancel", handler: () => { 
            this.navCtrl.pop(); 
          } 
        } 
      ] }); alert.present(); }, 
      error => { const errorAlert = this.alertCtrl.create({ message: error.message, buttons: [{ text: "Ok", role: "cancel" }] }); errorAlert.present(); 
    } ); 
  }
}



  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}

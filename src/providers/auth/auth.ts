
import { Injectable } from '@angular/core';

import firebase from 'firebase';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor() {
    
  }

  logInUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }

  signUpUser(email: string, phone: string, password: string): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(newUser => {
      firebase.auth().currentUser.sendEmailVerification().then(() =>{
        firebase.database().ref(`/userProfile/${newUser.uid}`).update({ email: email, phone: phone}); 
      }).catch(error => {
        console.error(error);
      });
    }).catch(error => console.error(error));
  }



  resetPassword(email:string): Promise<void> { 
    return firebase.auth().sendPasswordResetEmail(email); 
  } 
  logoutUser(): Promise<void> { 
    const userId: string = firebase.auth().currentUser.uid; 
    firebase
      .database()
      .ref(`/userProfile/${userId}`)
      .off();
    return firebase.auth().signOut(); 
  }
  
}

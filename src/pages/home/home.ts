import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
//import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import firebase from 'firebase';

import { ImagePicker } from '@ionic-native/image-picker';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public userProfile:firebase.database.Reference;
  public currentUser:firebase.User;

  public dbAll = firebase.database().ref(`/userProfile`);
  public exam1: any[] = [];
  public com1: any[] = [];
  public com2: any[] = [];
  
  //profiles: FirebaseListObservable<any[]>;
  public guestPicture: string = null; 

  public pics: Array<string>;

  constructor(public navCtrl: NavController,public cameraPlugin: Camera, private imagePicker: ImagePicker) {
    //this.profiles=af.list('/profiles');
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.currentUser = user;
        this.userProfile = firebase.database().ref(`/userProfile`);
      }
    });

    this.dbAll.once('value', (snapshot) => {
      snapshot.forEach(childSnapshot =>{
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        this.exam1.push(childData);
        console.log(childData);
        return true;  //Error occurs on type of function
      });
      console.log(snapshot.val());
      //this.list=snapshot;
    });

    firebase.database().ref('/comment').on('value', (snapshot) => {
      for(let childSnapshot in snapshot){
        
      }
      snapshot.forEach(childSnapshot =>{ 
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        this.com1.push(childData);
        this.com2.push(childKey);
        console.log(childData);
        return false;  //Error occurs on type of function
      });

    });

  }

  
  takePicture(): void { 
    console.log(this.exam1);
    
    this.cameraPlugin .getPicture({ 
      quality: 95, 
      destinationType: this.cameraPlugin.DestinationType.DATA_URL, 
      sourceType: this.cameraPlugin.PictureSourceType.CAMERA, 
      allowEdit: true, 
      encodingType: this.cameraPlugin.EncodingType.PNG, targetWidth: 500, targetHeight: 500, 
      saveToPhotoAlbum: true 
    }) .then( imageData => { 
      this.guestPicture = imageData; 
      firebase
      .storage()
      .ref(`/guest/pic.png`)
      .putString(this.guestPicture, 'base64', { contentType: 'image/png'})
      .then(savedPicture => {
        firebase.database().ref(`/photo`)
        .set(savedPicture.downloadURL);
      });
    }, error => { console.log("ERROR -> " + JSON.stringify(error));
   }); 
  }


  takeManyPicture(): void { 
    let options = {
      maximumImagesCount: 8,
      width: 500,
      height: 500,
      quality: 75
    }
  
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.pics.push(results[i]);
        /*firebase.storage().ref(`/test/${i}/pic.png`)
        .putString(pic, 'base64', { contentType: 'image/png'})
        .then(savedPicture => {
          firebase.database().ref(`/testPhotos`)
          .set(savedPicture.downloadURL);*/
        }
    }, (err) => { });
    
  }

  addComment(){
    firebase.database().ref('/comment/1')
    .set({user: "Geust", msg: "So it works?"});
    firebase.database().ref('/comment/1/reply')
    .set({user: "Admin", msg: "Of course"});
  }

  showComment(){
    firebase.database().ref('/comment').once('value', (snapshot) => {
      for(let childSnapshot in snapshot){
        
      }
      snapshot.forEach(childSnapshot =>{ 
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        this.com1.push(childData);
        this.com2.push(childKey);
        console.log(childData);
        return false;  //Error occurs on type of function
      });

    });
  }
  
  addItem() {
    let theNewComment: string = prompt("New Comment");
    if(theNewComment!==''){
      firebase.database().ref('/comment/2')
      .set({user: "Guest", msg: theNewComment});
    }
    
  }

  addReply(num: string){
    let theNewReply: string = prompt("New Reply");
    if(theNewReply!==''){
      firebase.database().ref(`/comment/${num}/reply`)
      .set({user: "Admin", msg: theNewReply});

    }
    console.log("REPLY" + num );
  }
  
}

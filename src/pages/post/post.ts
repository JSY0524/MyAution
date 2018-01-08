import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Posts } from './posts';
import firebase from 'firebase';

@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {
  photo: any;
  picurl:any;
  
  public refPost = firebase.database().ref(`/posts`);
  
  constructor(public navCtrl: NavController, public cameraPlugin: Camera/*, private imagePicker: ImagePicker*/) {
  
  }

  savePost(title: string, category: string, detail: string, price: number, endDate: Date ){
    this.refPost.push({ userUid: firebase.auth().currentUser.uid, title: title, category: category, detail: detail, price: price, endDate: endDate, timestamp: firebase.database.ServerValue.TIMESTAMP, picture: this.picurl, status: 'On' }).then( snap=> {
      firebase.database().ref(`userProfile/${firebase.auth().currentUser.uid}/myauction/${snap.key}`).set("true");
    });
    this.navCtrl.pop();
  }

  takePicture(): void {   
    var day = new Date();
    var filename: string = (day.getFullYear().toString()+day.getMonth().toString()+day.getDate().toString()+
    day.getHours().toString()+day.getMinutes().toString()+day.getMilliseconds().toString());
      
    this.cameraPlugin .getPicture({ 
      quality: 95, 
      destinationType: this.cameraPlugin.DestinationType.DATA_URL, 
      sourceType: this.cameraPlugin.PictureSourceType.CAMERA, 
      allowEdit: true, 
      encodingType: this.cameraPlugin.EncodingType.PNG, targetWidth: 500, targetHeight: 500, 
      saveToPhotoAlbum: true 
    }) .then( imageData => { 
      this.photo = imageData; 
          
      firebase.storage().ref(`/guest/${filename}.png`).putString(this.photo, 'base64', { contentType: 'image/png'})
      .then(savedPicture => {
        this.picurl = savedPicture.downloadURL;
      });
    }, error => { console.log("ERROR -> " + JSON.stringify(error));
   }); 
  }

  

    /*selectPictures(){
    let options = {
      maximumImagesCount: 3,
      width: 300,
      height: 300,
      quality : 75,
      outputType : 1
    };


    this.imagePicker.getPictures(options).then((results) => {
      for (var i=0; i<results.length; i++) {
        //this.pics.push(results[i]);
        //alert("inserted : " + results[i] );
      }
      this.picked = `data:image/jpeg;base64,${results[0]}`;

      //this.posts.push(this.photo);
      
    }, (err) => {} );
  }*/
  
}

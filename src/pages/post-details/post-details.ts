import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { BidPage } from '../bid/bid';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-post-details',
  templateUrl: 'post-details.html',
})
export class PostDetailsPage {
  postInfo: any;
  questions: any[]=[];
  isEnabled: boolean;
  phone: any;
  ph1: any;
  currUid: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dialogs: Dialogs) {
    this.postInfo=navParams.data.Posts;
    //this.isEnabled=navParams.data.isEnabled;
    this.reload();

    var postId = navParams.data.Posts.key;
    
    firebase.database().ref(`/userProfile/${this.postInfo.val().userUid}/phone`).on("value", snapshot => {
      console.log(snapshot.val());
      this.phone = snapshot.val();
    });

    /*firebase.database().ref(`/userProfile/${this.postInfo.val().log.biduid}/phone`).on("value", snapshot => {
      console.log(snapshot.val());
      this.ph1 = snapshot.val();
    });*/

    this.currUid = firebase.auth().currentUser.uid;
    

    console.log(this.phone);
    console.log(this.ph1);

    

  }

  

  goToBid(){
    this.navCtrl.push(BidPage, { postId: this.postInfo.key, postPrice: this.postInfo.val().price, postTitle: this.postInfo.val().title });
  }

  writeQuestion(){
    this.dialogs.prompt('Add a questino', 'Question', ['OK','Cancel'], '')
    .then(theResult =>{
      if((theResult.buttonIndex==1)&&theResult.input1!==''){
        firebase.database().ref(`/posts/${this.postInfo.key}/reply`)
        .push({user: "Guest", msg: theResult.input1});
      }
    }
    ).then(done => {
      this.reload()});
  }

  writeAnswer(question) {
    if(firebase.auth().currentUser.uid==this.postInfo.val().userUid){
      this.dialogs.prompt('Add a answer', 'Answer', ['OK','Cancel'], '')
      .then(theResult =>{
        if((theResult.buttonIndex==1)&&theResult.input1!==''){
          firebase.database().ref(`/posts/${this.postInfo.key}/reply/${question.key}/ans`)
          .set( {user: "Admin", msg: theResult.input1});
        }
      }
      ).then(done => {
        this.reload();
      });
    }
  }

  reload(){
    this.questions=[];
    firebase.database().ref(`/posts/${this.postInfo.key}/reply`).once('value', (snapshot) => {
      snapshot.forEach(childSnapshot =>{ 
        this.questions.push(childSnapshot);
        console.log(childSnapshot.val().user);
        return false; 
      }); 
    });
  }

  /*constructor(public navCtrl: NavController, public navParams: NavParams,public af: AngularFireDatabase) {
    this.isenabled = navParams.data.isenabled;
    this.postId = navParams.data.Posts.$key;
    firebase.database().ref(`/posts/${this.postId}/`)
    .on("value", snapshot => {
      this.postInfo = snapshot.val();
      const endDate = snapshot.val().endDate;
      this.postInfo.endDate = new Date(endDate).toLocaleDateString();
    })
    var date;
    console.log(this.postId);
    firebase.database().ref('/posts/'+this.postId+'/endDate')
    .on("value", snapshot =>{
      date = snapshot.val();
    });
    console.log(date);

    if(date < Date.now()){
       this.isenabled = false;
    }
    console.log(this.isenabled);
  }*/
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostPage } from '../post/post';
//import { BidPage } from '../bid/bid';

import firebase from 'firebase';

import { PostDetailsPage } from '../post-details/post-details';
import { Posts } from '../post/posts';

import { LogInPage } from '../log-in/log-in';

import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-board',
  templateUrl: 'board.html'
})
export class BoardPage {

  public posts: any[] = [];
  public postRef = firebase.database().ref().child('posts');
  category: string = "all";
  start: number = 0;
  end: number = 100000;

  constructor(public navCtrl: NavController, public authProvider: AuthProvider) {
    this.reload(this.category);
  }
  
  goToPost(){
    this.navCtrl.push(PostPage);
  }

  goPostDetail(thePost){
    this.navCtrl.push("PostDetailsPage", { Posts: thePost });
    console.log(thePost);    
  }

  ionViewWillEnter() {
    this.reload(this.category);
  }

  logOut(): void { 
    this.authProvider.logoutUser().then(() => { 
      this.navCtrl.setRoot(LogInPage); 
    }); 
  } 

  /*reload(){
    this.posts = [];
    this.postRef.orderByChild('timestamp').once('value', (snapshot) => {
      snapshot.forEach(childSnapshot =>{ 
        this.posts.push(childSnapshot);
        return false;
      }); 
    });
  }*/

  reload(category) {
    console.log(this.category);
    if(this.category == 'all'){
      firebase.database().ref('/posts').on('value', snap=>{
        this.posts = [];
        //console.log(snap.val());
          snap.forEach( childsnap =>{
          var data = childsnap.val();
            //console.log(data.price);
            console.log(this.start);
            console.log(this.end);
            if(Number(data.price) > this.start && Number(data.price) < this.end){
              console.log(data.price + this.start);
              this.posts.push(childsnap);
                /*{
                title: childsnap.val().title,
                detail: childsnap.val().detail,
                price: childsnap.val().price,
                $key: childsnap.key
              }*/
            }
            return false;
        })
      })
    }
    else{
      firebase.database().ref('/posts').orderByChild('category').equalTo(this.category)
      .on('value', snap=>{
        this.posts = [];
        console.log(snap.val());
          snap.forEach( childsnap =>{
            console.log(childsnap.key);
            var data = childsnap.val();
            console.log(data);
            console.log(childsnap.key);
            if(Number(data.price) > this.start && Number(data.price) < this.end){
              this.posts.push(childsnap/*{
                title: childsnap.val().title,
                detail: childsnap.val().detail,
                price: childsnap.val().price,
                $key: childsnap.key
              }*/);
            }
            return false;
        })
      })
  
    }
  }
}

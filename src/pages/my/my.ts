import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import { PostDetailsPage } from '../post-details/post-details';

@Component({
  selector: 'page-my',
  templateUrl: 'my.html'
})
export class MyPage {
  /*public posts: any[] = [];  
  public postRef = firebase.database().ref().child('posts');
  
  constructor(public navCtrl: NavController) {
    this.reload();
  }
  
  goPostDetail(thePost){
    this.navCtrl.push("PostDetailsPage", { Posts: thePost });
    console.log(thePost);    
  }
  
  reload(){
    this.posts = [];
    this.postRef.orderByChild('timestamp').once('value', (snapshot) => {
      snapshot.forEach(childSnapshot =>{ 
        this.posts.push(childSnapshot);
        return false;
      }); 
    });
  }*/

  userId: any;
  myauctionList: Array<any>;
  mywinningList: Array<any>;
  category: string;
  theFilteredLists: Array<any> = [];
  searchQuery: string = ' ';

  //필터링한 데이터를 어떻게 가져와야 하는지 고려해봐야 하는 부분

  constructor(public navCtrl: NavController) {
    this.category="selling";
    this.theFilteredLists = this.getList(this.category);
    
    this.filter(this.category, this.searchQuery);
    this.userId=firebase.auth().currentUser.uid;
    //this.getList(this.category);
  }

  getList(category){
    //console.log(this.category);
    if(category=="selling"){
      this.getmyAuction();
      return this.myauctionList;
    }
    /*else if(category=="bidding"){
      this.getmyBidding();
      return this.mybiddingList;
    }*/
    else if(category=="purchasing"){
      this.getMywin();
      return this.mywinningList;
    }
    return;
  }

  getFiltered(category, event) {    
    this.theFilteredLists = this.getList(category);
    let queryString = event.target.value;

    this.filter(category, queryString);
  }

  filter(category, queryString){
    if (queryString !== undefined) {
      // if the value is an empty string don't filter the items
      if (queryString.trim() == '') {
        return;
      }

      this.theFilteredLists = [];

      for (let thePost of this.getList(category)) {
        if (thePost.title.toLowerCase().indexOf(queryString.toLowerCase()) > -1) {
          this.theFilteredLists.push(thePost);
        }
      }
    }

  }
  

  getmyAuction(){
    firebase.database().ref(`/users/${this.userId}/myauction/`)
    .once('value').then( snapshot => {
      this.myauctionList = [];
      snapshot.forEach( childsnapshot => {
        if(!childsnapshot.exists()){
          console.log("no child");
          return false;
        }
        var childkey = childsnapshot.key;
        var childData = childsnapshot.val();
        //console.log(childkey);
        firebase.database().ref(`/posts/${childkey}`)
        .once('value', postSnapshot=>{
          this.myauctionList.push(postSnapshot)/*{
            title: postSnapshot.val().title,
            detail: postSnapshot.val().detail,
            price: postSnapshot.val().price,
            $key: childkey
            
          })*/;
        })
        //console.log(this.myauctionList);
      });
    });
  }
  getMywin(){
    firebase.database().ref(`/users/${this.userId}/mywinning/`)
    .once('value', snapshot => {
      this.mywinningList = [];
      snapshot.forEach( childsnapshot => {
        if(!childsnapshot.exists()){
          console.log("no child");
          return false;
        }
        var childkey = childsnapshot.key;
        var childData = childsnapshot.val();
        //console.log(childkey);
        firebase.database().ref(`/posts/${childkey}`)
        .once('value', postSnapshot=>{
          this.mywinningList.push(postSnapshot/*{
            title: postSnapshot.val().title,
            detail: postSnapshot.val().detail,
            price: postSnapshot.val().price,
            $key: childkey
          }*/);
        })
        //console.log(this.mywinningList);
      });
    });
  }

 /* goPostDetail(category, thePost : Posts){
    if(category=="purchasing"){
      this.navCtrl.push("MypageInfoPage", { Posts: thePost});
    }
    else{
      this.navCtrl.push("PostDetailsPage", { Posts: thePost, isenabled : false }); 
      console.log(thePost);   
    }
  }
*/
goPostDetail(thePost){
  this.navCtrl.push("PostDetailsPage", { Posts: thePost });
  console.log(thePost);    
}
}

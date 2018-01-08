import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-bid',
  templateUrl: 'bid.html'
})
export class BidPage {
  Id : string;
  price: number;
  title: string;
  uid: string;
  // this tells the tabs component which Pages
  // should be each tab's root Page

  //post-detail에서 물품이름과 가격만 가져옴

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.Id=navParams.data.postId;
    this.price=navParams.data.postPrice;
    this.title=navParams.data.postTitle;
    this.uid=firebase.auth().currentUser.uid;
  }

  priceCheck(addbid :number){
    console.log(Number(this.price)+1000);
    console.log(addbid);
    //1000원 단위로 비드가능
    if(addbid < Number(this.price)+1000){
      console.log("현재가 보다 1000원 높게 설정하세요!!");
      return;
    }
    else{
      firebase.database().ref(`/posts/${this.Id}/price`).set(addbid);
      firebase.database().ref(`/posts/${this.Id}/log`).set({
        email: firebase.auth().currentUser.email,
        biduid: this.uid,
        timestamp: Date.now()
      });
      firebase.database().ref(`/users/${this.uid}/mybidding/${this.Id}`).set("true");
      console.log("OK");    //여기에 가격이 높을시 디비를 바꿔주는 걸 수행
      this.navCtrl.pop();
    }
  }
}
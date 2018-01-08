import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostPage } from '../post/post';
import { BoardPage } from '../board/board';
import { MyPage } from "../my/my"

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = BoardPage;
  tab2Root: any = MyPage;
  constructor(public navCtrl: NavController) {
  }
  goToBoard(params){
    if (!params) params = {};    
    this.navCtrl.push(BoardPage);
  }
  goToMyPage(params){
    if (!params) params = {};
    //this.navCtrl.push(MyPagePage);
  }
}

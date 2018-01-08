import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsControllerPage } from '../pages/tabs/tabs-controller';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';

import { LogInPage } from '../pages/log-in/log-in'
import { BoardPage } from '../pages/board/board';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { EmailVerificationPage } from '../pages/email-verification/email-verification';
import { MyPage } from '../pages/my/my';
import { PostPage } from '../pages/post/post';
import { BidPage } from '../pages/bid/bid';


import { Camera } from '@ionic-native/camera';
import { Dialogs } from '@ionic-native/dialogs';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsControllerPage,
    LogInPage,
    BoardPage,
    SignUpPage,
    EmailVerificationPage,
    MyPage,
    PostPage,
    BidPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsControllerPage,
    LogInPage,
    BoardPage,
    SignUpPage,
    EmailVerificationPage,
    MyPage,
    PostPage,
    BidPage 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Camera,
    Dialogs
  ]
})
export class AppModule {}

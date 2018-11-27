import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController, App, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from "@ionic-native/network";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';

  pages: Array<{ title: string, component: any, icon: string, newsCat: string }>;

  constructor(
          public platform: Platform,
          public statusBar: StatusBar,
          public splashScreen: SplashScreen,
          public network: Network,
          public app: App,
          public toast: ToastController,
          public alertCtrl: AlertController,
            ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage', icon: 'fa fa-home', newsCat : ''},
      { title: 'Karavalli', component: 'ListPage', icon: 'fa fa-newspaper-o', newsCat: 'karvalli'},
      { title: 'State / National', component: 'ListPage', icon: 'fa fa-newspaper-o', newsCat: 'national' },
      { title: 'Entertainment', component: 'ListPage', icon: 'fa fa-television', newsCat: 'entertainment' },
      { title: 'Sports', component: 'ListPage', icon: 'fa fa-futbol-o', newsCat: 'sports' },
      { title: 'International', component: 'ListPage', icon: 'fa fa-globe', newsCat: 'international' },
      { title: 'Upcoming Program', component: 'UpcomingprogramsPage', icon: 'fa fa-calendar-plus-o', newsCat: 'upcomingProgram' },
      { title: 'Settings', component: 'SettingsPage', icon: 'fa fa-cog', newsCat: 'settings' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => { 
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNav();
        if (nav.canGoBack()) { //Can we go back?
          nav.pop();
        } else {
          this.exitFunction();
        }
      });

    });
  }

  openPage(page) { 
    this.nav.setRoot(page.component,{
      "newsCat": page.newsCat
    });
  }

  exitFunction() {
    let alert = this.alertCtrl.create({
      title: 'Exit Daijiworld247 ?',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }   

}

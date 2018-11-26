import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';

  pages: Array<{ title: string, component: any, icon: string, newsCat: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
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
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component,{
      "newsCat": page.newsCat
    });
  }
}

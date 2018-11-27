import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SocialSharing } from "@ionic-native/social-sharing";
import { CommonFuncProvider } from '../../providers/common-func/common-func';

@IonicPage()
@Component({
  selector: 'page-newsdisplay',
  templateUrl: 'newsdisplay.html',
})
export class NewsdisplayPage {
public intNewsID :number;
public strNewsTitle:string;
public singleNewsData: any;
public domainName: string = "";

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl: MenuController,
              public http: HttpClient,
              public loadingCtrl: LoadingController,
              public socialSharing: SocialSharing,
              public myFunc: CommonFuncProvider
              ) {
    this.domainName = myFunc.domainName;
    this.intNewsID = navParams.get('newsID');
    this.strNewsTitle = navParams.get('newsTitle');
    //alert(this.intNewsID);
    this.newsDisplayByID(this.intNewsID);
  }

  newsDisplayByID(newsID: number) {    
    let data: Observable<any>;
    let url = this.domainName + "handlers/newsMaster.ashx?newsMode=displayNews&newsID=" + newsID ;
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present().then(() => {
      data = this.http.get(url);
      data.subscribe(result => {
        console.log(result); 
        this.singleNewsData = result; 
        loader.dismiss(); 
      })
    });
  }

  shareNews() {
    //alert(this.newsID);
    let shareLink = ""; 
      shareLink = this.domainName + "news/newsDisplay.aspx?newsID=" + this.intNewsID;
   
    this.socialSharing.share(this.strNewsTitle, null, null, shareLink).then(() => {
      console.log('success');
    }).catch((error) => {
      console.log(error);
      console.log('error');
    });
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }


}

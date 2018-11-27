import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { CommonFuncProvider } from '../../providers/common-func/common-func';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { SocialSharing } from "@ionic-native/social-sharing";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public jsonItems: any;
  public domainName: string; 
  private intLastNewsID: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public menuCtrl: MenuController,
    public socialSharing: SocialSharing,
    public loadingCtrl: LoadingController,
    public myFunc: CommonFuncProvider
    ) {
    this.domainName = myFunc.domainName;
    this.getNewsData();
  }

  goToNewsDisplay(newsID: number, newsTitle: String) {
    this.navCtrl.push('NewsdisplayPage', {
      "newsID": newsID,
      "newsTitle": newsTitle
    })
  }


  getNewsData() {
    let data: Observable<any>;
    //alert(newsSection);
    let url = this.domainName + "handlers/newsInfiniteScroll.ashx";
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        this.jsonItems = result;
        let dataLength = this.jsonItems.length;
        this.intLastNewsID = this.jsonItems[dataLength - 1].newsID;
        console.log("Last News ID : " + this.intLastNewsID);
        loader.dismiss();
      })
    });
  }

  shareNews(newsTitle:string,newsID:number) {
    //alert(this.newsID);
    let shareLink = "";
    shareLink = this.domainName + "news/newsDisplay.aspx?newsID=" + newsID;
    this.socialSharing.share(newsTitle, null, null, shareLink).then(() => {
      console.log('success');
    }).catch((error) => {
      console.log(error);
      console.log('error');
    });
  }
}

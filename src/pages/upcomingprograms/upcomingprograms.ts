import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { CommonFuncProvider } from '../../providers/common-func/common-func';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-upcomingprograms',
  templateUrl: 'upcomingprograms.html',
})
export class UpcomingprogramsPage {
public domainName: string = "";
  public listOfUpcomingPro: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public myFunc: CommonFuncProvider
  ) {
    this.domainName = myFunc.domainName;
  }

  ionViewDidLoad() {
    this.getUpcomingPrograms();
  }


  toggleMenu() {
    this.menuCtrl.toggle();
  }


  getUpcomingPrograms() {
    let data: Observable<any>;
    let url = this.domainName + "handlers/upcomingPrograms.ashx";
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        this.listOfUpcomingPro = result;
        loader.dismiss();
      })
    });
  }

}

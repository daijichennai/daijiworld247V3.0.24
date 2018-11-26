import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { CommonFuncProvider } from '../../providers/common-func/common-func';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage { 
private newsCategory:string="";
  private domainName: string = "";
  public listNews: any;
  public newsCatName  :string="";
  public listOfNewsInfinite: any;
  private intLastNewsID: number;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public http: HttpClient,
      public menuCtrl: MenuController,
      public loadingCtrl: LoadingController,
      public myFunc: CommonFuncProvider
      ) {

    this.domainName = myFunc.domainName;
    this.newsCategory = navParams.get('newsCat');    
    this.newsCatName = myFunc.newsCategoryName(this.newsCategory);
    //alert(this.newsCategory);
    this.dispNewsByCatCode(this.newsCategory);
    
  }

  dispNewsByCatCode(newsCat) {
    let data: Observable<any>;
    //alert(newsSection);
    let url = this.domainName + "handlers/getNewsByCat.ashx?newsCategory=" + newsCat;
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        this.listNews = result;
        let dataLength = this.listNews.length;
        this.intLastNewsID = this.listNews[dataLength - 1].newsID;
        console.log("Last News ID : " + this.intLastNewsID);
        loader.dismiss();
      })
    });
  }

  doInfinite(e): Promise<any> {
    let infinteData: Observable<any>;
    return new Promise((resolve) => {
      setTimeout(() => {
        let infiniteURL = this.domainName + "handlers/getNewsByCat.ashx?newsCategory=" + this.newsCategory + "&lastNewsID=" + this.intLastNewsID;
        infinteData = this.http.get(infiniteURL);
        infinteData.subscribe(response => {
          if (response.noRecord !="noRecordFound"){
            this.listOfNewsInfinite = response;
            const newData = this.listOfNewsInfinite;
            this.intLastNewsID = this.listOfNewsInfinite[newData.length - 1].newsID;
            for (let i = 0; i < newData.length; i++) {
              this.listNews.push(newData[i]);
            }
          }         
          e.complete();
        })
        resolve();
      }, 500);
    })
  }


   
}

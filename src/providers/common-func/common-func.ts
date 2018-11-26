import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CommonFuncProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonFuncProvider {
  
  //public domainName: string = "https://www.daijiworld247.com/"
  public domainName: string = "http://192.168.1.2/daijiworld247/"

  constructor(public http: HttpClient) {
    //console.log('Hello CommonFuncProvider Provider');
  }

  newsCategoryName(newsCatCode){
    if (newsCatCode =="karvalli"){
      return "Karvalli";
    } else if (newsCatCode =="national"){
      return "National";
    } else if (newsCatCode == "entertainment") {
      return "Entertainment";
    } else if (newsCatCode == "sports") {
      return "Sports";
    } else if (newsCatCode == "international") {
      return "international";
    }
  }

}

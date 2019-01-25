import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { CampusProvider } from '../../providers/campus/campus';
import { Observable } from 'rxjs';


export interface Shirt { name: string; price: number; }
export interface ShirtId extends Shirt { id: string; }
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  campusData : Observable<any>;
  campusId : string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public campusService : CampusProvider) {
    this.campusId = navParams.get( "campusid" );
    console.log("It works......." + this.campusId)
  }

  ionViewDidLoad(){
    this.campusData = this.campusService.gettingCampusInfo( this.campusId ) 
  }
  goto(path){

    if(path == "close"){
      this.navCtrl.setRoot(LoginPage);
    }

    if(path == "CheckinPage"){
      this.navCtrl.push("CheckinPage",{campusId : this.campusId});
    }
   

  }

}

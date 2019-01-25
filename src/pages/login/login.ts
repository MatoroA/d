import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { CampusProvider } from '../../providers/campus/campus';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email : string = "";
  password : string = "";
  campusId
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService : AuthenticationProvider,
  public campusService : CampusProvider) {

  }

  login(){

    this.authService.signIn( this.email, this.password).subscribe( success=>{
      
      this.campusService.settingUpCampus( this.email ).subscribe( organizationId =>{
        this.campusService.gettingCampusId( organizationId ).subscribe( campusId=>{
          console.log( campusId )
          this.campusId = campusId;
          this.navCtrl.push(HomePage,{ campusid : this.campusId})
        })
      })

    }, error =>{
      console.log("it fails")
      console.log( error )
    })
    
    
  }

}

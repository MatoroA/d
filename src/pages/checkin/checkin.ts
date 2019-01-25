import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController , AlertController   } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { CampusProvider, companyId } from '../../providers/campus/campus';
import { EmployeeId, EmployeesProvider } from '../../providers/employees/employees';
import { map } from 'rxjs/operators';


// export interface Item { id: string; name: string; }

@IonicPage()
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',
})
export class CheckinPage {

  @ViewChild(Slides) slides: Slides;

  
  myInput : '';
  searchFeedback : string = "start typing...";
  pager : number = 1;
  

  CompanyData : Observable<companyId[]>;
  employeesData  : Observable<EmployeeId[]>;
  searchedEmployees  : Observable<EmployeeId[]>;

  campusId : string = "";

  constructor( public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
  public campusService : CampusProvider, public employeesService : EmployeesProvider ) {
  
    this.campusId = navParams.get("campusId");
    
  }
  ionViewDidLoad(){
    this.CompanyData = this.campusService.gettingCompanyNames(this.campusId);
  }
  onSelectChange(event){

    this.employeesData  =  this.employeesService.getEmployees( event );
  }

  goToSlide(x) {

    switch(x){
      case 0 :
        this.pager = 1;
      break;
      case 1 :
        this.pager = 2;
      break;
      case 2 :
        this.pager = 3;
      break;
    }
    this.slides.slideTo(x, 500);

    console.log(this.pager);
    
  }
  onInput($event){
    
    this.searchedEmployees = this.employeesData.pipe(
      map( employeeArray =>
        employeeArray.filter( employee =>{
          return (employee.firstname+""+employee.lastname).toLowerCase().indexOf(this.myInput.toLowerCase()) > -1;
        })
      ))

  }

  createAppointment(user){
    
    
    this.showConfirm();
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Use this lightsaber?',
      message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  chooseEmployee(emp){
    console.log(emp);
    
  }
 

}

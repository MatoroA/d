import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  constructor(public http: HttpClient, public afAuth: AngularFireAuth) {
    console.log('Hello AuthenticationProvider Provider');
  }

  signIn( email , password){

    return new Observable(observer => { 
      
      this.afAuth.auth.signInWithEmailAndPassword( email , password ).then(user =>{

              observer.next(true);
              observer.complete();

      }).catch((error) =>{
        observer.error(error.message)
      })
       
    });
  }

}

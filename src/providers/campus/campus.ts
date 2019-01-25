import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Item } from 'ionic-angular';
import { map } from 'rxjs/operators';

export interface company { name: string; campusId: number; }
export interface companyId extends company { id: string; }

export interface Item { name: string , organizationId : string}
@Injectable()
export class CampusProvider {

  private items : Observable<any>;
  private userDoc : Observable<Item>;
  private campusCollection : AngularFirestoreCollection<Item[]>;
  private campusDoc : AngularFirestoreDocument<Item>;

  constructor(public http: HttpClient,private afs: AngularFirestore) {
    console.log('Hello CampusProvider Provider');
  }

  settingUpCampus( email ){

    return new Observable(observer => { 
        
      this.afs.collection("users").ref.where("email", "==", email )
    .get()
    .then((querySnapShot) => {

          querySnapShot.forEach((doc) =>{
            observer.next( doc.data().organizationId );
            observer.complete();
          }) 
      
      }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    })

  }

  gettingCampusId( id  ){

    return new Observable(observer => { 
      
        var docRef = this.afs.collection("organizations").doc(id);
        
        docRef.ref.get().then((doc) => {
            if (doc.exists) {
              observer.next( doc.data().campusId );
              observer.complete();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

    })
  }
  gettingCampusInfo( campusId ){
    this.campusDoc = this.afs.doc("campuses/"+campusId)

    this.items =   this.campusDoc.valueChanges();
    return this.items;
  }


  gettingCompanyNames( id ) : Observable<any>{

    return this.afs.collection<company>('organizations',ref => ref.where('campusId', '==', id)).snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.doc.data() as company;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
    

  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Employee { firstname: string; lastname: string; orgId: number; }
export interface EmployeeId extends Employee { id: string; }

@Injectable()
export class EmployeesProvider {

  constructor(public http: HttpClient, private afs : AngularFirestore) {
    console.log('Hello EmployeesProvider Provider');
  }

  getEmployees( orgId ): Observable<any> {

    return this.afs.collection<Employee>('users',ref => ref.where('organizationId', '==', orgId)).snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.doc.data() as Employee;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  

}

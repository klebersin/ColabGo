import { Injectable } from '@angular/core';
import { Service } from '../interfaces/interfaces';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private db: AngularFirestore) { }

  getServices(){
    return this.db.collection('Service').snapshotChanges().pipe( map( services => {
      return services.map(a => {
        const data = a.payload.doc.data() as Service;
        data.id = a.payload.doc.id;
        return data;
      });
    }) );
  }
  getNearbyServices(lat: string, lng: string){

  }
  getMyServices(id: string){

  }
  getService(id: string){
    return this.db.collection('Service').doc(id).valueChanges();
  }
  addService(service: Service){
    return this.db.collection('Service').add(service);
  }
  deleteService(id: string){
    return this.db.collection('Service').doc(id).delete();
  }

}

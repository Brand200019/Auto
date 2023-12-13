import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData ,query, where, QueryConstraint } from '@angular/fire/firestore';
import Tipo from '../shared/tipo_usuario.interface';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FirebaseTipoService {

  constructor(private firestore: Firestore) { }

  addTipo(tipo: Tipo){
    const TipoRef = collection(this.firestore, 'Tipo');
    return addDoc(TipoRef, tipo);
  }
  getTipoByCorreo(correo: string): Observable<Tipo[]> {
    const TipoRef = collection(this.firestore, 'Tipo');
    const constraint: QueryConstraint = where('correo', '==', correo);
    const q = query(TipoRef, constraint);
    return collectionData(q, { idField: 'id' }) as Observable<Tipo[]>;
  }

  
}

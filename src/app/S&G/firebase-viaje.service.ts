import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, arrayUnion, addDoc, collectionData, DocumentReference } from '@angular/fire/firestore';
import Viaje from '../shared/Viaje.interface';
import { Observable } from 'rxjs';
import { updateDoc, DocumentData, deleteDoc, getDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseViajeService {

  constructor(private firestore: Firestore) { }

  addViaje(viaje: Viaje) {
    const viajeRef = collection(this.firestore, 'Viaje');
    return addDoc(viajeRef, viaje);
  }

  getViaje(): Observable<Viaje[]> {
    const placeRef = collection(this.firestore, 'Viaje');
    return collectionData(placeRef, { idField: 'id' }) as Observable<Viaje[]>;
  }
  

  deletePlace(viaje: Viaje) {
    const placeDocRef = doc(this.firestore, `Viaje/${viaje.id}`);
    return deleteDoc(placeDocRef);
  }

  async addCorreosToViaje(viaje: Viaje, correos: string[]) {
    const viajeDocRef = doc(this.firestore, `Viaje/${viaje.id}`);
    const viajeDoc = await getDoc(viajeDocRef);
    if (viajeDoc.exists()) {
      return updateDoc(viajeDocRef, { lista: arrayUnion(...correos) });
    } else {
      return setDoc(viajeDocRef, { lista: correos }, { merge: true });
    }
  }
  async getViajeById(viaje: Viaje): Promise<Viaje | undefined> {
    const viajeDocRef = doc(this.firestore, `Viaje/${viaje.id}`);
    
    try {
      const viajeDoc = await getDoc(viajeDocRef);

      if (viajeDoc.exists()) {
        return { id: viajeDoc.id, ...viajeDoc.data() } as Viaje;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error('Error al obtener el viaje por ID:', error);
      return undefined;
    }
  }
}
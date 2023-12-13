import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../shared/user.class.ts/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public isLogged: any =false;
  constructor( public FireAuth: AngularFireAuth,private FireStore : AngularFirestore ,private afAuth: AngularFireAuth) {
    FireAuth.authState.subscribe( User  =>(this.isLogged = User));
  }
  //login 

    async onlogin(user: User): Promise<boolean> {
      try {
        await this.FireAuth.signInWithEmailAndPassword(user.email, user.password);
        return true; 
      } catch (e) {
        console.log(e);
        return false; 
      }
    }
  
  //registrar
  async onRegister(user:User){
    try{
      return await this.FireAuth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      
    }
    catch(e){
      console.log(e);
    }
    return true;
  }
  crearTipo(record: Array<string>){
    return this.FireStore.collection('Tipo').add(record)
  }


  resetPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}

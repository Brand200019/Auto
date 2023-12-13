import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../S&G/auth.service';
import { User } from '../shared/user.class.ts/user.class';
import { FirebaseTipoService } from '../S&G/firebase-tipo.service';
import {  FormControl, FormGroup, } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  TipoName:any;
  TipoTipo:any;
  formularioData: any = {};
  user: User = new User();
  opcional?: string;
  email?: string;
  constructor(private authsvc: AuthService,private tiposervices : FirebaseTipoService ,private router: Router) {
    
  
  }

  ngOnInit() {
    
  }
  async onRegister(){
    const user =await this.authsvc.onRegister(this.user);
    console.log(this.user.email);
    if (user){
      this.formularioData = ({
        correo: this.user.email,
        tipo_pasajero: this.opcional,
      });
      this.Tipoadd();
      console.log ('registro exitoso');
      console.log (this.opcional);
      this.router.navigate(['/iniciarseccion'], { queryParams: { nombreUsuario: this.user.email } });
    }
  }
  async Tipoadd(){
    console.log(this.formularioData);
    const response = await this.tiposervices.addTipo(this.formularioData);

    console.log(response);
  }

}

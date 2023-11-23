import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-iniciarseccion',
  templateUrl: './iniciarseccion.page.html',
  styleUrls: ['./iniciarseccion.page.scss'],
})
export class IniciarseccionPage implements OnInit {
  validar =false;
  forminiciarsesion= {
    usuario: "",
    contrasenna:""
  }
  nombre: ""=""
  contrasenna:""=""
  constructor(private router: Router, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();

  }
  async guarda(nombre: string, contrasenna: string) { 
    return this.storage.set(nombre, contrasenna);}
    async valida(nombre: string, contrasenna: string) {
      const almacenado = await this.storage.get(nombre);
      if (almacenado === contrasenna) {
        this.router.navigate(['/home'], { queryParams: { nombreUsuario: nombre } });
      } else {
        console.log('Usuario o contraseña incorrectos');
      }
  }
}


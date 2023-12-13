import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../S&G/auth.service';
import { User } from '../shared/user.class.ts/user.class';
@Component({
  selector: 'app-iniciarseccion',
  templateUrl: './iniciarseccion.page.html',
  styleUrls: ['./iniciarseccion.page.scss'],
})
export class IniciarseccionPage implements OnInit {

  nombre: ""=""
  contrasenna:""=""
  user: User = new User();
  constructor(private router: Router, private storage: Storage,private Services : AuthService) { }

  async ngOnInit() {
    await this.storage.create();

  }
  async onLogin() {
    try {
      const user = await this.Services.onlogin(this.user);

      if (user) {
        console.log('Usuario encontrado');
        this.router.navigate(['/home'], { queryParams: { nombreUsuario: this.user.email } });
      } else {
        console.log('Inicio de sesión fallido. Verifica las credenciales.');
      }
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
    }
  }
}


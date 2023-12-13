import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../S&G/auth.service';

@Component({
  selector: 'app-recuperarcontra',
  templateUrl: './recuperarcontra.page.html',
  styleUrls: ['./recuperarcontra.page.scss'],
})
export class RecuperarcontraPage implements OnInit {
  email: string = ''; 

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
      
  }
  resetPassword() {
    this.authService.resetPassword(this.email)
      .then(() => {
        console.log('Correo electrónico de recuperación de contraseña enviado.');
      })
      .catch((error) => {
        console.error('Error al enviar el correo electrónico de recuperación:', error.message);
      });
  }

}

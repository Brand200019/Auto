import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';
import { AuthService } from '../S&G/auth.service';
import { Route } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseTipoService } from '../S&G/firebase-tipo.service';
import Tipo from '../shared/tipo_usuario.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('avatar', { read: ElementRef }) avatar: ElementRef;
  animation: Animation;
  storage: any;
  nombreUsuario: string=""; 
  tipo?: Tipo[];
  constructor(private tiposervices: FirebaseTipoService,private animationCtrl: AnimationController, private activatedRoute: ActivatedRoute,private service: AuthService,private router: Router, private FireAuth : AngularFireAuth) {
    this.avatar = new ElementRef(null); 
    this.animation = this.animationCtrl.create();

  }

  ngAfterViewInit() {
    this.animation
      .addElement(this.avatar.nativeElement)
      .duration(5000)
      .iterations(1)  
      .fill('forwards')  
      .keyframes([
        { offset: 0, transform: 'translateX(0px)', opacity: '1' },
        { offset: 0.25, transform: 'translateX(100vw)', opacity: '0.2' },
        { offset: 0.50, transform: 'translateX(0px)', opacity: '1' },
        { offset: 0.75, transform: 'translateX(-100vw)', opacity: '0' },
        { offset: 1, transform: 'translateX(0px)', opacity: '0' },
      ])
      .play()
        setTimeout(() => {
          this.animation.play();
      }, 1000); 
  };
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['nombreUsuario']) {
        this.nombreUsuario = params['nombreUsuario'];
      }
    });
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['nombreUsuario']) {
        this.nombreUsuario = params['nombreUsuario'];
        // Llamar a la función con el correo para obtener el Tipo correspondiente
        this.tiposervices.getTipoByCorreo(this.nombreUsuario).subscribe((tipo) => {
          this.tipo = tipo;
          console.log('Tipo:', tipo);
        });
      }
    });
  
  }

  getNombreUsuario(): string {
    return this.nombreUsuario;
  }
  async onLogout(){
    console.log('Logout!');
    this.FireAuth.signOut();
    this.router.navigate(['/']);
  }
  irMap(){
    console.log('Usuario encontrado');
        this.router.navigate(['/map'], { queryParams: { nombreUsuario: this.nombreUsuario} });
  }
  irViajar(){
    console.log('Usuario encontrado');
        this.router.navigate(['/viaje'], { queryParams: { nombreUsuario: this.nombreUsuario} });
  }
}


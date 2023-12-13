import { Component, OnInit } from '@angular/core';
import { FirebaseViajeService } from '../S&G/firebase-viaje.service';
import Viaje from '../shared/Viaje.interface';
import { Geolocation } from '@capacitor/geolocation';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../shared/user.class.ts/user.class';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {
  user: User = new User();
  viaje?: Viaje[];
  public map!: mapboxgl.Map;
  public coordenadas: any;
  public style = 'mapbox://styles/mapbox/streets-v11';
  cantidadCorreos: number = 0; 
  nombreUsuario: string= ''; 

  constructor(private viajeservices: FirebaseViajeService,private activatedRoute: ActivatedRoute, private router: Router,public alertController: AlertController) {
  }

  async ngOnInit() {
      this.viajeservices.getViaje().subscribe(viaje => {
        this.viaje = viaje;
      })
    
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['nombreUsuario']) {
        this.nombreUsuario = params['nombreUsuario'];
      }
    });
    console.log('nombre',this.nombreUsuario)
    this.coordenadas = await Geolocation.getCurrentPosition();
    
  }
  
  initializeMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [this.coordenadas.coords.longitude, this.coordenadas.coords.latitude],
      zoom: 14,
      accessToken: environment.MapBox_Key,
    });
  }
  getNombreUsuario(): string {
    return this.nombreUsuario;
  }
  async onClickDelete(viaje: Viaje) {
    const response = await this.viajeservices.deletePlace(viaje);
    console.log(response);
  }
  async onClickAgregarCorreos(viaje: Viaje) {
    const nuevoCorreo = this.nombreUsuario; 
    const nuevosCorreos: string[] = [nuevoCorreo];
    await this.viajeservices.addCorreosToViaje(viaje, nuevosCorreos);
    const viajeActualizado = await this.viajeservices.getViajeById(viaje);
    if (viajeActualizado) {
      this.cantidadCorreos = viajeActualizado.lista.length;
      console.log(this.cantidadCorreos);
      this.presentAlert();
    }

  }
  volver(){
    this.router.navigate(['/home'], { queryParams: { nombreUsuario: this.user.email } });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Registro exitoso',
      message: 'se logro guardar con exito su puesto en este auto.',
      buttons: [
        {
          text: 'volver',
          handler: () => {
            this.volver(); 
          }
        }
      ]
    });
    await alert.present();
  }
}

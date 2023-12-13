import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { FirebaseViajeService } from '../S&G/firebase-viaje.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../shared/user.class.ts/user.class';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  user: User = new User();
  public map!: mapboxgl.Map;
  public style = 'mapbox://styles/mapbox/streets-v11';
  public destino: number[] = [];
  public contadorMarcadores = 0;
  public coordenadas: any;
  nombre: string = '';
  precio: number = 0;
  cantidad: number = 0;
  mostrarDestinos: { [key: string]: any } = [];
  nombreUsuario: string= ''; 



  constructor(private viajeservices : FirebaseViajeService, private activatedRoute: ActivatedRoute, private router : Router) { }
  formularioData: any = {};
  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['nombreUsuario']) {
        this.nombreUsuario = params['nombreUsuario'];
      }
    });
    this.coordenadas = await Geolocation.getCurrentPosition();
    console.log('Current position:', this.coordenadas);
    this.initializeMap();
    console.log('nombre:',this.nombreUsuario)
  }
  eliminar (){
    console.log('eliminar:', this.destino);
    this.destino= [];
    this.contadorMarcadores= 0;
    console.log('eliminado:', this.destino);
    console.log(this.destino.length);
    this.initializeMap();
  }
  initializeMap() {

    this.map = new mapboxgl.Map({
      container: 'map-container',
      style: this.style,
      center: [this.coordenadas.coords.longitude, this.coordenadas.coords.latitude],
      zoom: 14,
      accessToken: environment.MapBox_Key,
    });

    // Agregar el control de navegación al mapa
    this.map.addControl(new mapboxgl.NavigationControl());
    const originMarker = new mapboxgl.Marker()
    .setLngLat([this.coordenadas.coords.longitude,this.coordenadas.coords.latitude])
    .addTo(this.map);
    // Agregar un evento de clic al mapa
    this.map.on('click', (e) => {
      this.destino = [e.lngLat.lng, e.lngLat.lat];
      console.log(this.destino);
      this.getDirections(this.destino);
      console.log(this.destino.length);
      if (this.destino.length === 2 && this.contadorMarcadores === 0) {
        const destinoMarker = new mapboxgl.Marker({ color: '#FF0000' })
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(this.map);
        this.contadorMarcadores++;
      }
    });
    
  }

  getDirections(destino: number[]) {
    // Coordenadas de origen y destino para la solicitud de dirección
    const origin = [this.coordenadas.coords.longitude, this.coordenadas.coords.latitude];
    const key = environment.MapBox_Key;
    // Construir la URL de la solicitud de dirección
    const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destino[0]},${destino[1]}?geometries=geojson&access_token=${key}`;
    
    // Realizar la solicitud GET a la API de Direcciones de Mapbox
    fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    if (data.routes && data.routes.length > 0) {
      // Obtener las coordenadas de la ruta desde la respuesta de la API de direcciones
      const routeCoordinates = data.routes[0].geometry.coordinates;

      // Crear una nueva capa de origen a destino en el mapa
      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: routeCoordinates
            }
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3b9ddd',
          'line-width': 5
        }
      });
    } else {
      console.error('No se encontró una ruta válida.');
    }
  })
  .catch(error => {
    // Manejar errores de la solicitud
    console.error('Error:', error);
  });}
  getNombreUsuario(): string {
    return this.nombreUsuario;
  }
  async viajeadd(){
    this.formularioData = ({
      longinit:this.coordenadas.coords.longitude ,
      latinit: this.coordenadas.coords.latitude,
      longfin: this.destino[0],
      latfin: this.destino[1],
      nombre: this.nombre,
      precio: this.precio,
      cantidad: this.cantidad,
      correo:this.nombreUsuario,
    });
    const response = await this.viajeservices.addViaje(this.formularioData);
    console.log(response);
    this.router.navigate(['/home'], { queryParams: { nombreUsuario: this.user.email } });
  }
  volver(){
    this.router.navigate(['/home'], { queryParams: { nombreUsuario: this.user.email } });
  }
}
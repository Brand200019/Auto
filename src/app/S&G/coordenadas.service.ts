import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoordenadasService {
  private data: { [key: string]: any } = [];
  constructor() { }
  mostrarDestinos(): any {
    const resultadosDestinos: { [key: string]: any } = {};
    for (const clave in this.data) {
      if (clave.includes('destinos')) {
        resultadosDestinos[clave] = this.data[clave];
      }
    }
    return resultadosDestinos;
  }
}


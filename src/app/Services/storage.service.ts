import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  guardar(llave: string, datos:any){
    localStorage.setItem(llave, JSON.stringify(datos))
  }

  obtener<T>(llave:string): T | null {
    const datos = localStorage.getItem(llave);
    return datos ? JSON.parse(datos) : null;
  }

  eliminar(llave: string){
    localStorage.removeItem(llave);
  }


}

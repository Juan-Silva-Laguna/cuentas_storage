import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Ingresos } from '../Models/ingresos';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {
 llave = "ingresos";
  constructor(private db: StorageService) { }

  obtenerIngresos(): Ingresos[]{
    return this.db.obtener<Ingresos[]>(this.llave) || [];
  }

  agregarIngreso(ingreso: Ingresos) {
    const ingresos = this.obtenerIngresos();
    ingresos.push(ingreso);
    this.db.guardar(this.llave, ingresos);
    return ingresos;
  }

  eliminarIngresos(ingreso: Ingresos){
    const ingresos = this.obtenerIngresos();
    const newIngresos = ingresos.filter(ing => ing.id !== ingreso.id);
    this.db.guardar(this.llave, newIngresos);
    return newIngresos;
  }

  actualizarIngreso(ingreso: Ingresos) {
    const ingresos = this.obtenerIngresos();

    const newIngresos = ingresos.map(ing =>
      ing.id === ingreso.id ? { ...ing, descripcion: ingreso.descripcion, categoria: ingreso.categoria, fecha: ingreso.fecha, valor: ingreso.valor } : ing
    );
    this.db.guardar(this.llave, newIngresos);

    return newIngresos;
  }
}

import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Gastos } from '../Models/gastos';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
 llave = "gastos";
  constructor(private db: StorageService) { }

  obtenerGastos(): Gastos[]{
    return this.db.obtener<Gastos[]>(this.llave) || [];
  }

  agregarGasto(gasto: Gastos) {
    const gastos = this.obtenerGastos();
    gastos.push(gasto);
    this.db.guardar(this.llave, gastos);
    return gastos;
  }

  eliminarGastos(gasto: Gastos){
    const gastos = this.obtenerGastos();
    const newGastos = gastos.filter(gas => gas.id !== gasto.id);
    this.db.guardar(this.llave, newGastos);
    return newGastos;
  }

  actualizarGasto(gasto: Gastos) {
    const gastos = this.obtenerGastos();

    const newGastos = gastos.map(gas =>
      gas.id === gasto.id ? { ...gas, descripcion: gasto.descripcion, categoria: gasto.categoria, fecha: gasto.fecha, valor: gasto.valor } : gas
    );
    this.db.guardar(this.llave, newGastos);

    return newGastos;
  }
}

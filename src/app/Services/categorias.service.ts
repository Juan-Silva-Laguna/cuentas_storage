import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Categorias } from '../Models/categorias';
@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  llave = "categorias";
  constructor(private db: StorageService) { }

  obtenerCategorias(): Categorias[]{
    return this.db.obtener<Categorias[]>(this.llave) || [];
  }

  agregarCategoria(categoria: Categorias) {
    const categorias = this.obtenerCategorias();
    categorias.push(categoria);
    this.db.guardar(this.llave, categorias);
    return categorias;
  }

  eliminarCategorias(categoria: Categorias){
    const categorias = this.obtenerCategorias();
    const newCategorias = categorias.filter(cat => cat.id !== categoria.id);
    this.db.guardar(this.llave, newCategorias);
    return newCategorias;
  }

  actualizarCategoria(categoria: Categorias) {
    const categorias = this.obtenerCategorias();

    const newCategorias = categorias.map(cat =>
      cat.id === categoria.id ? { ...cat, nombre: categoria.nombre, tipo: categoria.tipo } : cat
    );
    this.db.guardar(this.llave, newCategorias);

    return newCategorias;
  }
}

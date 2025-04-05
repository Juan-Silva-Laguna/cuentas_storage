import { Component } from '@angular/core';
import { Categorias } from '../../../Models/categorias';
import { CategoriasService } from '../../../Services/categorias.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  imports: [CommonModule,FormsModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {
  categorias: Categorias[];
  nombre = '';
  id=0;
  tipo = "ingreso";

  constructor(private categoriasService: CategoriasService) {
    this.categorias = this.categoriasService.obtenerCategorias();
  }

  eliminar(categoria: Categorias){
    this.categorias = this.categoriasService.eliminarCategorias(categoria);
  }

  llenarFormulario(categoria: Categorias){
    this.nombre = categoria.nombre;
    this.tipo = categoria.tipo
    this.id = categoria.id
  }

  agregarCategoria() {
    if (this.id==0) {
      const nuevaCategoria: Categorias = { id: Date.now(), nombre: this.nombre, tipo: this.tipo=='ingreso'?'ingreso':'gasto' };
      this.categorias = this.categoriasService.agregarCategoria(nuevaCategoria);
    }else{
      const categoriaEditada: Categorias = { id: this.id, nombre: this.nombre, tipo: this.tipo=='ingreso'?'ingreso':'gasto' };
      this.categorias = this.categoriasService.actualizarCategoria(categoriaEditada);
    }
    this.limpiar();
  }

  limpiar(){
    this.nombre = '';
    this.tipo = 'ingreso'
    this.id = 0
  }
}
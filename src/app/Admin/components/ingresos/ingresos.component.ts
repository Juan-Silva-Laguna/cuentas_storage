import { Component } from '@angular/core';
import { Ingresos } from '../../../Models/ingresos';
import { IngresosService } from '../../../Services/ingresos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categorias } from '../../../Models/categorias';
import { CategoriasService } from '../../../Services/categorias.service';

@Component({
  selector: 'app-ingresos',
  imports: [CommonModule,FormsModule],
  templateUrl: './ingresos.component.html',
  styleUrl: './ingresos.component.css'
})
export class IngresosComponent {
  ingresos: Ingresos[];
  categorias: Categorias[];
  descripcion = '';
  id=0;
  valor=0;
  fecha: Date = new Date();
  categoria = 0;

  constructor(private ingresosService: IngresosService, private categoriasServices: CategoriasService) {
    this.ingresos = this.ingresosService.obtenerIngresos();
    this.categorias = this.categoriasServices.obtenerCategorias().filter(cat => cat.tipo == "ingreso");
  }

  eliminar(ingreso: Ingresos){
    this.ingresos = this.ingresosService.eliminarIngresos(ingreso);
  }

  llenarFormulario(ingreso: Ingresos){
    this.descripcion = ingreso.descripcion;
    this.categoria = ingreso.categoria
    this.valor = ingreso.valor
    this.fecha = ingreso.fecha
    this.id = ingreso.id
  }

  agregarIngreso() {
    if (this.id==0) {
      const nuevaIngreso: Ingresos = { id: Date.now(), descripcion: this.descripcion, categoria: this.categoria, valor: this.valor, fecha: this.fecha};
      this.ingresos = this.ingresosService.agregarIngreso(nuevaIngreso);
    }else{
      const ingresoEditada: Ingresos = { id: this.id, descripcion: this.descripcion, categoria: this.categoria, valor: this.valor, fecha: this.fecha};
      this.ingresos = this.ingresosService.actualizarIngreso(ingresoEditada);
    }
    this.limpiar();
  }

  limpiar(){
    this.descripcion = '';
    this.categoria = 0
    this.valor = 0
    this.fecha = new Date();
    this.id = 0
  }
}
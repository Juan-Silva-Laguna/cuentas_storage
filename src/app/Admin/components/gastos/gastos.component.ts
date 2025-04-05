import { Component } from '@angular/core';
import { Gastos } from '../../../Models/gastos';
import { GastosService } from '../../../Services/gastos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categorias } from '../../../Models/categorias';
import { CategoriasService } from '../../../Services/categorias.service';

@Component({
  selector: 'app-gastos',
  imports: [CommonModule,FormsModule],
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css'
})
export class GastosComponent {
  gastos: Gastos[];
  categorias: Categorias[];
  descripcion = '';
  id=0;
  valor=0;
  fecha: Date = new Date();
  categoria = 0;

  constructor(private gastosService: GastosService, private categoriasServices: CategoriasService) {
    this.gastos = this.gastosService.obtenerGastos();
    this.categorias = this.categoriasServices.obtenerCategorias().filter(cat => cat.tipo == "gasto");
  }

  eliminar(gasto: Gastos){
    this.gastos = this.gastosService.eliminarGastos(gasto);
  }

  llenarFormulario(gasto: Gastos){
    this.descripcion = gasto.descripcion;
    this.categoria = gasto.categoria
    this.valor = gasto.valor
    this.fecha = gasto.fecha
    this.id = gasto.id
  }

  agregarGasto() {
    if (this.id==0) {
      const nuevaGasto: Gastos = { id: Date.now(), descripcion: this.descripcion, categoria: this.categoria, valor: this.valor, fecha: this.fecha};
      this.gastos = this.gastosService.agregarGasto(nuevaGasto);
    }else{
      const gastoEditada: Gastos = { id: this.id, descripcion: this.descripcion, categoria: this.categoria, valor: this.valor, fecha: this.fecha};
      this.gastos = this.gastosService.actualizarGasto(gastoEditada);
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
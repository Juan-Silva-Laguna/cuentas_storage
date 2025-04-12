import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Categorias } from '../../../Models/categorias';
import { CategoriasService } from '../../../Services/categorias.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AlertasService } from '../../../Services/alertas.service';

@Component({
  selector: 'app-categorias',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatPaginatorModule
  ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent  implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.categorias.paginator = this.paginator;
  }
  

  categorias = new MatTableDataSource<Categorias>();

  nombre = '';
  id=0;
  tipo = "ingreso";
  columnas: string[] = ['nombre', 'tipo', 'acciones'];
  textButton = "Añadir Categoría";

  constructor(private categoriasService: CategoriasService,
    private alertasServices: AlertasService
  ) {}
  
  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categorias.data = this.categoriasService.obtenerCategorias();
  }

  async eliminar(categoria: Categorias) {
    const confirmado = await this.alertasServices.mostrarConfirmacion();
    if (confirmado) {
      this.categorias.data = this.categoriasService.eliminarCategorias(categoria);
      this.alertasServices.generarAlerta("Categoria Eliminada",'ok');

    } else {
      console.log("Cancelado por el usuario");
    }
  }

  llenarFormulario(categoria: Categorias){
    this.nombre = categoria.nombre;
    this.tipo = categoria.tipo
    this.id = categoria.id
    this.textButton = "Editar Categoría";
    document.getElementById('nombreCategoria')?.focus()
  }

  agregarCategoria() {
    if (this.id==0) {
      const nuevaCategoria: Categorias = { id: Date.now(), nombre: this.nombre, tipo: this.tipo=='ingreso'?'ingreso':'gasto' };
      this.categorias.data = this.categoriasService.agregarCategoria(nuevaCategoria);
      this.alertasServices.generarAlerta("Categoria Creada",'ok');
    }else{
      const categoriaEditada: Categorias = { id: this.id, nombre: this.nombre, tipo: this.tipo=='ingreso'?'ingreso':'gasto' };
      this.categorias.data = this.categoriasService.actualizarCategoria(categoriaEditada);
      this.alertasServices.generarAlerta("Categoria Actualizada",'ok');

    }
    this.limpiar();
  }

  limpiar(){
    this.nombre = '';
    this.tipo = 'ingreso'
    this.id = 0
    this.textButton = "Añadir Categoría";
  }
}
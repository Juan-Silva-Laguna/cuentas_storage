import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Gastos } from '../../../Models/gastos';
import { GastosService } from '../../../Services/gastos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categorias } from '../../../Models/categorias';
import { CategoriasService } from '../../../Services/categorias.service';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-gastos',
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
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css'
})
export class GastosComponent  implements AfterViewInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.gastos.paginator = this.paginator;
  }
  

  gastos = new MatTableDataSource<Gastos>();

  categorias: Categorias[] = [];
  descripcion = '';
  id=0;
  valor=0;
  fecha: Date = new Date();
  categoria = 0;
  columnas: string[] = ['fecha', 'descripcion', 'valor', 'acciones'];
  textButton = "Añadir Gasto";

  constructor(private gastosService: GastosService, 
    private categoriasServices: CategoriasService,
    private alertasServices: AlertasService
  ) {}

  ngOnInit(): void {
    this.categorias = this.categoriasServices.obtenerCategorias().filter(cat => cat.tipo == "gasto");
    this.obtenerGastos();
  }

  obtenerGastos(): void {
    this.gastos.data = this.gastosService.obtenerGastos();
  }

  async eliminar(gasto: Gastos){
    const confirmado = await this.alertasServices.mostrarConfirmacion("¿Estás seguro de eliminar el gasto?");
    if (confirmado) {
      this.gastos.data = this.gastosService.eliminarGastos(gasto);
      this.alertasServices.generarAlerta("Gasto Eliminado",'ok');

    } else {
      console.log("Cancelado por el usuario");
    }
  }

  llenarFormulario(gasto: Gastos){
    this.descripcion = gasto.descripcion;
    this.categoria = gasto.categoria
    this.valor = gasto.valor
    this.fecha = gasto.fecha
    this.id = gasto.id
    this.textButton = "Editar Gasto";
    document.getElementById('descripcion')?.focus()
  }

  agregarGasto() {
    if (this.id==0) {
      const nuevaGasto: Gastos = { id: Date.now(), descripcion: this.descripcion, categoria: this.categoria, valor: this.valor, fecha: this.fecha};
      this.gastos.data = this.gastosService.agregarGasto(nuevaGasto);
      this.alertasServices.generarAlerta("Gasto Agregado",'ok');

    }else{
      const gastoEditada: Gastos = { id: this.id, descripcion: this.descripcion, categoria: this.categoria, valor: this.valor, fecha: this.fecha};
      this.gastos.data = this.gastosService.actualizarGasto(gastoEditada);
      this.alertasServices.generarAlerta("Gasto Editado",'ok');

    }
    this.limpiar();
  }

  limpiar(){
    this.descripcion = '';
    this.categoria = 0
    this.valor = 0
    this.fecha = new Date();
    this.id = 0
    this.textButton = "Añadir Gasto";
  }
}
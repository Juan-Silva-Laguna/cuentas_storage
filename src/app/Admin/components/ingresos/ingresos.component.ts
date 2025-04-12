import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Ingresos } from '../../../Models/ingresos';
import { IngresosService } from '../../../Services/ingresos.service';
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
  selector: 'app-ingresos',
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
  templateUrl: './ingresos.component.html',
  styleUrl: './ingresos.component.css'
})
export class IngresosComponent  implements AfterViewInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.ingresos.paginator = this.paginator;
  }
  

  ingresos = new MatTableDataSource<Ingresos>();

  categorias: Categorias[] = [];
  descripcion = '';
  id=0;
  valor=0;
  fecha: Date = new Date();
  categoria = 0;
  columnas: string[] = ['fecha', 'descripcion', 'valor', 'acciones'];
  textButton = "Añadir Ingreso";

  constructor(private ingresosService: IngresosService, 
    private categoriasServices: CategoriasService,
    private alertasServices: AlertasService
  ) {}

  ngOnInit(): void {
    this.categorias = this.categoriasServices.obtenerCategorias().filter(cat => cat.tipo == "ingreso");
    this.obtenerIngresos();
  }

  obtenerIngresos(): void {
    this.ingresos.data = this.ingresosService.obtenerIngresos();
  }

  async eliminar(ingreso: Ingresos){
    const confirmado = await this.alertasServices.mostrarConfirmacion("¿Estás seguro de eliminar el ingreso?");
    if (confirmado) {
      this.ingresos.data = this.ingresosService.eliminarIngresos(ingreso);
      this.alertasServices.generarAlerta("Ingreso Eliminado",'ok');

    } else {
      console.log("Cancelado por el usuario");
    }
  }

  llenarFormulario(ingreso: Ingresos){
    this.descripcion = ingreso.descripcion;
    this.categoria = ingreso.categoria
    this.valor = ingreso.valor
    this.fecha = ingreso.fecha
    this.id = ingreso.id
    this.textButton = "Editar Ingreso";
    document.getElementById('descripcion')?.focus()
  }

  agregarIngreso() {
    if (this.id==0) {
      const nuevaIngreso: Ingresos = { id: Date.now(), descripcion: this.descripcion, categoria: this.categoria, valor: this.valor, fecha: this.fecha};
      this.ingresos.data = this.ingresosService.agregarIngreso(nuevaIngreso);
      this.alertasServices.generarAlerta("Ingreso Agregado",'ok');

    }else{
      const ingresoEditada: Ingresos = { id: this.id, descripcion: this.descripcion, categoria: this.categoria, valor: this.valor, fecha: this.fecha};
      this.ingresos.data = this.ingresosService.actualizarIngreso(ingresoEditada);
      this.alertasServices.generarAlerta("Ingreso Editado",'ok');

    }
    this.limpiar();
  }

  limpiar(){
    this.descripcion = '';
    this.categoria = 0
    this.valor = 0
    this.fecha = new Date();
    this.id = 0
    this.textButton = "Añadir Ingreso";
  }
}
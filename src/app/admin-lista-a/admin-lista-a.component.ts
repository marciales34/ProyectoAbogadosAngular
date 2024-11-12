import { Component, OnInit } from '@angular/core';
import { AdminMenuComponent } from '../admin-menu/admin-menu.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router'; 
import { AbogadosService } from '../servicios/abogados.service';
import { AlertaService } from '../servicios/alerta.service';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Abogado } from '../abogado'; 
import { FormsModule } from '@angular/forms';  // Asegúrate de importar esto


@Component({
  selector: 'app-admin-lista-a',
  standalone: true,
  imports: [CommonModule, AdminMenuComponent, FooterComponent, NgFor, HttpClientModule, FormsModule ],
  templateUrl: './admin-lista-a.component.html',
  styleUrls: ['./admin-lista-a.component.css']
})
export class AdminListaAComponent implements OnInit  {
  datos: any = [];
  formularioVisible: boolean = false;
  abogadoEnEdicion: any = {}; // Aquí vamos a guardar los datos del abogado que estamos editando
  constructor(
    private AbogadoServicio: AbogadosService,
    private router: Router, 
    private alertaService: AlertaService
  ) {}

  ngOnInit(): void {
    this.listarabogados(); // Al inicializar, cargamos la lista de abogados
  }

  // Obtener lista de abogados
  listarabogados() {
    this.AbogadoServicio.ListarAbogados().subscribe(
      res => {
        this.datos = res; // Asignamos la respuesta de la API a la variable "datos"
      },
      err => console.log(err)
    );
  }

  // Abrir el formulario de edición con los datos del abogado
  abrirFormularioEdicion(abogado: any) {
    this.abogadoEnEdicion = { ...abogado }; // Clonamos el abogado para evitar modificar directamente el objeto de la lista
    this.formularioVisible = true; // Mostramos el modal
  }

  // Cerrar el formulario de edición
  cerrarFormularioEdicion() {
    this.formularioVisible = false; // Ocultamos el modal
    this.abogadoEnEdicion = {}; // Limpiamos los datos del abogado
  }

  // Actualizar abogado en la base de datos
  actualizarAbogado() {
    this.AbogadoServicio.actualizarAbogado(this.abogadoEnEdicion.id, this.abogadoEnEdicion).subscribe(
      res => {
        this.alertaService.success('Abogado actualizado con éxito.', true);
        this.listarabogados(); // Refrescamos la lista de abogados
        this.cerrarFormularioEdicion(); // Cerramos el modal
      },
      err => {
        console.log(err);
        this.alertaService.error('Error al actualizar el abogado.');
      }
    );
  }

  // Eliminar abogado
  eliminarAbogado(id: number) {
    this.alertaService.confirm(
      '¿Estás seguro de eliminar este Abogado?',
      'Esta acción no se puede deshacer. ¿Deseas continuar?'
    ).then((result) => {
      if (result.isConfirmed) {
        this.AbogadoServicio.eliminarAbogado(id).subscribe(
          () => {
            this.alertaService.success('Abogado eliminado con éxito.', true);
            this.listarabogados(); // Refrescamos la lista de abogados
          },
          (error) => {
            console.error('Error al eliminar el abogado', error);
            this.alertaService.error('Hubo un error al eliminar el abogado. Intenta de nuevo más tarde.');
          }
        );
      }
    }).catch((error) => {
      console.error('Error en la confirmación', error);
    });
  }

  // Volver a la pantalla principal del administrador
  volverAdminPrincipal() {
    this.router.navigate(['/admin-principal']);
  }
}

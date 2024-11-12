import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../servicios/clientesAdmin.service';
import { AlertaService } from '../servicios/alerta.service';
import { AdminMenuComponent } from "../admin-menu/admin-menu.component";
import { FooterComponent } from "../footer/footer.component";
import { NgFor ,CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importamos FormsModule solo si es necesario

@Component({
  selector: 'app-admin-lista-clientes',
  templateUrl: './admin-lista-c.component.html',
  styleUrls: ['./admin-lista-c.component.css'],
  standalone: true, // Esto es correcto si estás usando Angular Standalone Components
  imports: [ AdminMenuComponent, FooterComponent, NgFor, FormsModule,CommonModule  ],
})
export class AdminListaClientesComponent implements OnInit {
  datos: any = [];
  formularioC :boolean = false; // Inicializado como 'false'
  clienteEnEdicion: any = {}; // Aquí guardamos los datos del cliente que estamos editando

  constructor(
    private ClientesServicio: ClientesService, 
    private router: Router, 
    private alertaService: AlertaService
  ) {}

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes() {
    this.ClientesServicio.ListarClientes().subscribe(
      res => {
        this.datos = res;
      },
      err => console.log(err)
    );
  }

  // Abrir el formulario de edición con los datos del cliente
  abrirFormularioEdicion(cliente: any) {
    this.formularioC = true;
    this.clienteEnEdicion = { ...cliente }; // Clonamos el cliente para evitar modificar directamente el objeto de la lista
    
  }

  // Cerrar el formulario de edición
  cerrarFormularioEdicion() {
    this.formularioC = false;
    this.clienteEnEdicion = {}; // Limpiamos los datos del cliente
  }

  // Actualizar cliente en la base de datos
  actualizarCliente() {
    this.ClientesServicio.actualizarCliente(this.clienteEnEdicion.id, this.clienteEnEdicion).subscribe(
      res => {
        this.alertaService.success('Cliente actualizado con éxito.', true);
        this.listarClientes();
        this.cerrarFormularioEdicion();
      },
      err => {
        console.log(err);
        this.alertaService.error('Error al actualizar el cliente.');
      }
    );
  }

  // Eliminar cliente
  eliminarCliente(id: number) {
    this.alertaService.confirm(
      '¿Estás seguro de eliminar este Cliente?',
      'Esta acción no se puede deshacer. ¿Deseas continuar?'
    ).then((result) => {
      if (result.isConfirmed) {
        this.ClientesServicio.eliminarCliente(id).subscribe(
          () => {
            this.alertaService.success('Cliente eliminado con éxito.', true);
            this.listarClientes(); // Refrescamos la lista de clientes
          },
          (error) => {
            console.error('Error al eliminar el cliente', error);
            this.alertaService.error('Hubo un error al eliminar el cliente. Intenta de nuevo más tarde.');
          }
        );
      }
    }).catch((error) => {
      console.error('Error en la confirmación', error);
    });
  }

  volverAdminPrincipal() {
    this.router.navigate(['/admin-principal']);
  }
}

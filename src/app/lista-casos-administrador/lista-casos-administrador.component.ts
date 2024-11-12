import { Component, OnInit } from '@angular/core';
import { ListaCasosService } from '../servicios/lista-casos.service';
import { AdminMenuComponent } from '../admin-menu/admin-menu.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AlertaService } from '../servicios/alerta.service';
import { Caso } from '../caso';
import { AbogadosService } from '../servicios/abogados.service';
import { ClientesService } from '../servicios/clientesAdmin.service';



@Component({

  selector: 'app-lista-casos-administrador',
  templateUrl: './lista-casos-administrador.component.html',
  styleUrls: ['./lista-casos-administrador.component.css'],
  standalone: true,  // Esto es necesario para usar imports en un componente standalone (si tu versión de Angular lo soporta)
  imports: [CommonModule, AdminMenuComponent, FooterComponent, FormsModule],
})
export class ListaCasosAdministradorComponent implements OnInit {

  datos: any[] = [];
  casos: Caso[] = [];
  formularioVisible: boolean = false;
  isLoggedIn: boolean = false;
  noCasosAvailable: boolean = false;
  casoEnEdicion: Caso = new Caso();  
  casoSeleccionado: Caso | null = null;
  

  filtroAbogado: string = '';
  filtroCliente: string = '';
  resultadosAbogados: any[] = [];
  resultadosClientes: any[] = [];


  constructor(
    private casosServicio: ListaCasosService,
    private alertaService: AlertaService,
    private router: Router,
    private http: HttpClient,
    private abogadosService: AbogadosService,
    private clientesService: ClientesService
  ) {}

  ngOnInit(): void {
    this.listarCasos();
  }

  listarCasos(): void {
    this.casosServicio.listarCasos().subscribe(
      res => {
        this.datos = res;
      },
      err => console.log(err)
    );
  }

  abrirFormularioCaso(): void {
    this.casoEnEdicion = new Caso(); 
        this.casoSeleccionado = null;
    this.formularioVisible = true;
  }

  abrirFormularioEdicion(caso: any): void {
    this.casoEnEdicion = { ...caso }; // Clonamos el caso para no modificar el original
    this.casoSeleccionado = caso;
    this.formularioVisible = true;
  }

  cerrarFormularioCaso(): void {
    this.formularioVisible = false;
    this.casoEnEdicion = new Caso();
    this.casoSeleccionado = null;
  }

  crearCaso(): void {
    this.casosServicio.crearCaso(this.casoEnEdicion).subscribe(
      res => {
        this.alertaService.success('Caso creado con éxito.', true);
        this.datos.push(res);  // Agrega el nuevo caso a la lista
        this.cerrarFormularioCaso();
      },
      err => {
        console.log(err);
        this.alertaService.error('Error al crear el caso.');
      }
    );
  }

  actualizarCaso(): void {
    if (this.casoSeleccionado && this.casoSeleccionado.id) {
      this.casosServicio.actualizarCaso(this.casoSeleccionado.id, this.casoEnEdicion).subscribe(
        res => {
          this.alertaService.success('Caso actualizado con éxito.', true);
          const index = this.datos.findIndex(c => c.id === this.casoSeleccionado?.id);
          if (index !== -1) {
            this.datos[index] = res;  // Actualiza el caso en la lista
          }
          this.cerrarFormularioCaso();
        },
        err => {
          console.log(err);
          this.alertaService.error('Error al actualizar el caso.');
        }
      );
    } else {
      console.error('No se ha seleccionado un caso válido para actualizar.');
      this.alertaService.error('No se ha seleccionado un caso para actualizar.');
    }
  }
  
  eliminarCaso(id: number): void {
    this.alertaService.confirm('¿Estás seguro de eliminar este caso?',"bien").then(result => {
      if (result.isConfirmed) {
        this.casosServicio.eliminarCaso(id).subscribe(
          () => {
            this.alertaService.success('Caso eliminado con éxito.', true);
            this.datos = this.datos.filter(c => c.id !== id);  // Elimina el caso de la lista
          },
          err => {
            console.log(err);
            this.alertaService.error('Error al eliminar el caso.');
          }
        );
      }
    }).catch(err => {
      console.error('Error en confirmación: ', err);
    });
  }
  
  volverAdminPrincipal(): void {
    this.router.navigate(['/admin-principal']);
  }

  
   // Métodos de búsqueda para abogados y clientes
   buscarAbogados() {
    this.abogadosService.ListarAbogados().subscribe((data: any[]) => {
      this.resultadosAbogados = data.filter(abogado => 
        abogado.nombre.toLowerCase().includes(this.filtroAbogado.toLowerCase())
      );
    });
  }

  buscarClientes() {
    this.clientesService.ListarClientes().subscribe((data: any[]) => {
      this.resultadosClientes = data.filter(cliente => 
        cliente.nombre.toLowerCase().includes(this.filtroCliente.toLowerCase())
      );
    });
  }

  seleccionarAbogado(abogado: any) {
    this.casoEnEdicion.id_abogado_encargado = abogado.id;
    this.filtroAbogado = abogado.nombre;
    this.resultadosAbogados = [];
  }

  seleccionarCliente(cliente: any) {
    this.casoEnEdicion.id_cliente = cliente.id;
    this.filtroCliente = cliente.nombre;
    this.resultadosClientes = [];
  }
}

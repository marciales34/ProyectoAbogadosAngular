import { Component, OnInit } from '@angular/core';
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
  selector: 'app-admin-casos',
  standalone: true,
  imports: [CommonModule, AdminMenuComponent, FooterComponent, FormsModule],
  templateUrl: './admin-casos.component.html',
  styleUrls: ['./admin-casos.component.css']
})
export class AdminCasosComponent implements OnInit {
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
    private http: HttpClient,
    private router: Router,
    private alertaService: AlertaService,
    private abogadosService: AbogadosService,
    private clientesService: ClientesService
  ) {}

  ngOnInit(): void {
    // Verificar si localStorage está disponible
    if (typeof window !== 'undefined' && window.localStorage) {
      const abogadoId = localStorage.getItem('abogadoId');
      this.isLoggedIn = !!abogadoId && this.verificarEstadoLogin();

      if (this.isLoggedIn) {
        this.http.get<Caso[]>('http://localhost:8080/casos').subscribe(
          (response: Caso[]) => {
            this.casos = response;
            this.noCasosAvailable = this.casos.length === 0;
          },
          (error) => {
            console.error('Error al obtener los datos de los casos', error);
            this.alertaService.error('Error al obtener los datos, intenta de nuevo más tarde.');
          }
        );
      }
    }
  }

  

  abrirFormularioCaso(): void {
    this.casoEnEdicion = new Caso();  // Reiniciamos el caso en edición
    this.formularioVisible = true;
  }

  abrirFormularioEdicion(caso: Caso): void {
    this.casoSeleccionado = caso;
    this.casoEnEdicion = { ...caso };  // Clonamos el caso para que el formulario se llene correctamente
    this.formularioVisible = true;
  }

  cerrarFormularioCaso(): void {
    this.formularioVisible = false;
    this.casoEnEdicion = new Caso();
    this.casoSeleccionado = null;
  }

  crearCaso(): void {
    this.http.post<Caso>('http://localhost:8080/registra-casos', this.casoEnEdicion).subscribe(
      (response) => {
        this.alertaService.success('Caso creado con éxito.',true);
        this.casos.push(response);  // Agregamos el nuevo caso a la lista de casos
        this.cerrarFormularioCaso();
      },
      (error) => {
        console.error('Error al crear el caso', error);
        this.alertaService.error('Error al crear el caso, intenta de nuevo más tarde.');
      }
    );
  }

  actualizarCaso(): void {
    if (!this.casoSeleccionado) return;
    
    this.http.put<Caso>('http://localhost:8080/casos/${this.casoSeleccionado.id', this.casoEnEdicion).subscribe(
      (response) => {
        this.alertaService.success('Caso actualizado con éxito.',true);
        // Actualizar el caso en la lista de casos
        const index = this.casos.findIndex(c => c.id === this.casoSeleccionado?.id);
        if (index !== -1) {
          this.casos[index] = response;
        }
        this.cerrarFormularioCaso();
      },
      (error) => {
        console.error('Error al actualizar el caso', error);
        this.alertaService.error('Error al actualizar el caso, intenta de nuevo más tarde.');
      }
    );
  }

  
  
 

  volverAdminPrincipal() {
    this.router.navigate(['/admin-principal']);
  }

  private verificarEstadoLogin(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token;
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
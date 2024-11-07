import { Component, OnInit } from '@angular/core';
import { AdminMenuComponent } from '../admin-menu/admin-menu.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { AlertaService } from '../servicios/alerta.service';
import { Caso } from '../caso'; 
import { AbogadosService } from '../servicios/abogados.service'; // Importa AbogadosService
import { ClientesService } from '../servicios/clientesAdmin.service'; // Importa ClientesService

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
  nuevoCaso: Caso = new Caso();

  filtroAbogado: string = ''; // Filtro para la búsqueda de abogado
  filtroCliente: string = ''; // Filtro para la búsqueda de cliente
  resultadosAbogados: any[] = []; // Resultados filtrados de abogados
  resultadosClientes: any[] = []; // Resultados filtrados de clientes

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private alertaService: AlertaService,
    private abogadosService: AbogadosService, // Servicio de abogados
    private clientesService: ClientesService // Servicio de clientes
  ) {}

  ngOnInit(): void {
    const abogadoId = localStorage.getItem('abogadoId');
    console.log('Abogado ID desde localStorage:', abogadoId);
  
    this.isLoggedIn = !!abogadoId && this.verificarEstadoLogin();
    console.log('¿Usuario está logueado?', this.isLoggedIn);
  
    if (this.isLoggedIn) {
      this.http.get<Caso[]>('http://localhost:8080/casos').subscribe(
        (response: Caso[]) => {
          this.casos = response; 
          console.log('Casos obtenidos:', this.casos);
          this.noCasosAvailable = this.casos.length === 0; 
        },
        (error) => {
          if (error.status === 404) {
            this.alertaService.error('No se encontraron casos para este abogado.');
            this.noCasosAvailable = true;
          } else {
            console.error('Error al obtener los datos de los casos', error);
            this.alertaService.error('Error al obtener los datos, intenta de nuevo más tarde.');
          }
        }
      );
    } else {
      this.alertaService.error('No se ha encontrado un ID de abogado. Por favor, inicia sesión nuevamente.');
    }
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
    this.nuevoCaso.id_abogado_encargado = abogado.id;
    this.filtroAbogado = abogado.nombre;
    this.resultadosAbogados = [];
  }

  seleccionarCliente(cliente: any) {
    this.nuevoCaso.id_cliente = cliente.id;
    this.filtroCliente = cliente.nombre;
    this.resultadosClientes = [];
  }

  crearCaso(): void {
    this.http.post<Caso>('http://localhost:8080/registra-casos', this.nuevoCaso).subscribe(
      (response) => {
        this.alertaService.success('Caso creado con éxito.', true);
        this.casos.push(response);
        this.formularioVisible = false;
        this.nuevoCaso = new Caso();
      },
      (error) => {
        console.error('Error al crear el caso', error);
        this.alertaService.error('Error al crear el caso, intenta de nuevo más tarde.');
      }
    );
  }

  cerrarFormularioCaso(): void {
    this.formularioVisible = false;
  }

  abrirFormularioCaso(): void {
    this.formularioVisible = true;
    this.nuevoCaso = new Caso(); 
  }

  logout(): void {
    localStorage.removeItem('abogadoId');
    localStorage.removeItem('accessToken'); 
    this.router.navigate(['Login-Abogados']); 
    this.alertaService.success('Has cerrado sesión correctamente.', true); 
  }

  volverAdminPrincipal() {
    this.router.navigate(['/admin-principal']);
  }

  private verificarEstadoLogin(): boolean {
    const token = localStorage.getItem('accessToken'); 
    return !!token; 
  }
}

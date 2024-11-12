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
  correoCliente: string = ''; // Nuevo campo para el correo del cliente
  public abogados: any[] = []; // Declara una variable para almacenar los abogados
  
  constructor(private http: HttpClient, private router: Router, private alertaService: AlertaService, private abogadosService: AbogadosService) {}

  ngOnInit(): void {

    this.obtenerAbogados()
    const abogadoId = localStorage.getItem('abogadoId');
    console.log('Abogado ID desde localStorage:', abogadoId);
  
    this.isLoggedIn = !!abogadoId && this.verificarEstadoLogin();
    console.log('¿Usuario está logueado?', this.isLoggedIn);
  
    if (this.isLoggedIn) {
      this.http.get<Caso[]>(`http://localhost:8080/casos/${abogadoId}`).subscribe(
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
  

  buscarCliente(): void {
    if (!this.correoCliente) {
      this.alertaService.error('Por favor, ingresa un correo electrónico.');
      return;
    }

    this.http.get(`http://localhost:8080/buscarCliente?correo=${this.correoCliente}`).subscribe(
      (cliente: any) => {
        if (cliente && cliente.id) {
          this.alertaService.success('Cliente encontrado con éxito', true);
          this.nuevoCaso.id_cliente = cliente.id; // Asigna el ID del cliente encontrado
          console.log('ID del cliente encontrado:', cliente.id);
        } else {
          this.alertaService.error('Cliente no encontrado.');
        }
      },
      (error) => {
        console.error('Error al buscar el cliente', error);
        this.alertaService.error('Error al buscar el cliente, intenta de nuevo.');
      }
    );
  }

  crearCaso(): void {
    // Validar que todos los campos estén completos
    if (
      !this.nuevoCaso.id_abogado_encargado ||
      !this.nuevoCaso.id_cliente ||
      !this.nuevoCaso.estado_caso ||
      !this.nuevoCaso.descripcion_caso ||
      !this.nuevoCaso.evidencia ||
      !this.nuevoCaso.testimonios ||
      !this.nuevoCaso.rama_id
    ) {
      this.alertaService.error('Todos los campos son obligatorios para crear el caso.');
      return;
    }
  
    // Confirmación antes de crear el caso
    this.alertaService
      .confirmSave(
        '¿Registrar nuevo caso?',
        'Estás a punto de registrar un nuevo caso en el sistema. ¿Deseas continuar?'
      )
      .then((confirmado) => {
        if (confirmado) {
          const casoData = {
            id_abogado_encargado: Number(this.nuevoCaso.id_abogado_encargado),
            id_cliente: this.nuevoCaso.id_cliente,
            estado_caso: this.nuevoCaso.estado_caso,
            descripcion_caso: this.nuevoCaso.descripcion_caso,
            evidencia: this.nuevoCaso.evidencia,
            testimonios: this.nuevoCaso.testimonios,
            rama_id: Number(this.nuevoCaso.rama_id),
          };
  
          // Llamada para crear el caso si se confirmó la alerta
          this.http.post<Caso>('http://localhost:8080/registra-casos', casoData).subscribe(
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
      })
      .catch(() => {
        this.alertaService.info('Registro de caso cancelado.');
      });
  }
  

  private verificarEstadoLogin(): boolean {
    const token = localStorage.getItem('accessToken'); 
    return !!token; 
  }


  obtenerAbogados() {
    this.abogadosService.ListarAbogados().subscribe(
      (data: any) => {
        this.abogados = data; // Almacena la lista de abogados en la variable
      },
      (error) => {
        console.error('Error al obtener abogados:', error);
      }
    );
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

  abrirFormularioCaso(): void {
    this.formularioVisible = true; // Cambia a true para mostrar el formulario
    this.nuevoCaso = new Caso(); // Reinicia nuevoCaso cada vez que abres el formulario
  }
}
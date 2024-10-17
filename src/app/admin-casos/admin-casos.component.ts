import { Component, OnInit } from '@angular/core';
import { AdminMenuComponent } from '../admin-menu/admin-menu.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { AlertaService } from '../servicios/alerta.service';
import { Caso } from '../caso'; 

@Component({
  selector: 'app-admin-casos',
  standalone: true,
  imports: [CommonModule, AdminMenuComponent, FooterComponent, FormsModule],
  templateUrl: './admin-casos.component.html',
  styleUrls: ['./admin-casos.component.css'] // Cambiado a styleUrls
})
export class AdminCasosComponent implements OnInit { // Asegúrate de implementar OnInit
  casos: Caso[] = []; 
  formularioVisible: boolean = false; 
  isLoggedIn: boolean = false; 
  noCasosAvailable: boolean = false; // Nueva propiedad para controlar si hay casos disponibles
  nuevoCaso: Caso = new Caso(); // Asegúrate de que tengas una clase Caso definida
  
  constructor(private http: HttpClient, private router: Router, private alertaService: AlertaService) {}

  ngOnInit(): void {
    const abogadoId = localStorage.getItem('abogadoId');
    console.log('Abogado ID desde localStorage:', abogadoId);
  
    // El administrador debe poder ver todos los casos
    this.isLoggedIn = !!abogadoId && this.verificarEstadoLogin();
    console.log('¿Usuario está logueado?', this.isLoggedIn);
  
    if (this.isLoggedIn) {
      // Asegúrate de que este endpoint sea llamado para obtener todos los casos
      this.http.get<Caso[]>('http://localhost:8080/admin/casos').subscribe(
        (response: Caso[]) => {
          this.casos = response; 
          console.log('Casos obtenidos:', this.casos);
  
          // Verifica si no hay casos disponibles
          this.noCasosAvailable = this.casos.length === 0; 
        },
        (error) => {
          if (error.status === 404) {
            this.alertaService.error('No se encontraron casos para este abogado.');
            this.noCasosAvailable = true; // Si no se encontraron casos, se establece a true
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
  

  private verificarEstadoLogin(): boolean {
    const token = localStorage.getItem('accessToken'); 
    return !!token; 
  }

  crearCaso(): void {
    this.http.post<Caso>('http://localhost:8080/registra-casos', this.nuevoCaso).subscribe(

        (response) => {
            this.alertaService.success('Caso creado con éxito.', true); // o false, dependiendo de tu necesidad
            this.casos.push(response); // Agregar el nuevo caso a la lista
            this.formularioVisible = false; // Ocultar el formulario
            this.nuevoCaso = new Caso(); // Reiniciar el formulario
        },
        (error) => {
            console.error('Error al crear el caso', error);
            this.alertaService.error('Error al crear el caso, intenta de nuevo más tarde.'); 
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

import { Component } from '@angular/core';
import { EncabezadoComponent } from "../encabezado/encabezado.component";
import { FooterComponent } from "../footer/footer.component";
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AlertaService } from '../servicios/alerta.service';
import { Caso } from '../caso'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [EncabezadoComponent, FooterComponent, NgFor, NgIf],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  casos: Caso[] = []; 
  isLoggedIn: boolean = false; 
  noCasosAvailable: boolean = false; 

  constructor(private http: HttpClient, private router: Router, private alertaService: AlertaService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const clienteId = localStorage.getItem('clienteId');
      console.log('Cliente ID desde localStorage:', clienteId);

      this.isLoggedIn = !!clienteId && this.verificarEstadoLogin();  // Aquí usa el método
      console.log('¿Usuario está logueado?', this.isLoggedIn);

      if (this.isLoggedIn) {
        this.http.get<Caso[]>(`http://localhost:8080/Casos/${clienteId}`).subscribe(
          (response: Caso[]) => {
            this.casos = response; 
            console.log('Casos obtenidos:', this.casos); 

            this.noCasosAvailable = this.casos.length === 0; 
          },
          (error) => {
            if (error.status === 404) {
              this.alertaService.error('No se encontraron casos a este cliente.');
              this.noCasosAvailable = true;
            } else {
              console.error('Error al obtener los datos de los casos', error);
              this.alertaService.error('Error al obtener los datos, intenta de nuevo más tarde.');
            }
          }
        );
      } else {
        this.alertaService.error('No se ha encontrado un ID de Cliente. Por favor, inicia sesión nuevamente.');
      }
    } 
  }

  private verificarEstadoLogin(): boolean {
    const token = localStorage.getItem('accessToken'); 
    return !!token; 
  }

  logout(): void {
    localStorage.removeItem('clienteId');
    localStorage.removeItem('accessToken'); 
    this.router.navigate(['Inicio-pagina-principal']); 
    this.alertaService.success('Has cerrado sesión correctamente.', true); 
  }
}

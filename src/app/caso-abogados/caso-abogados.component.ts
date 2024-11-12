import { Component } from '@angular/core';
import { EncabezadoComponent } from "../encabezado/encabezado.component";
import { FooterComponent } from "../footer/footer.component";
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AlertaService } from '../servicios/alerta.service';
import { Caso } from '../caso'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-caso-abogados',
  standalone: true,
  imports: [EncabezadoComponent, FooterComponent, NgFor, NgIf],
  templateUrl: './caso-abogados.component.html',
  styleUrls: ['./caso-abogados.component.css']
})
export class CasoAbogadosComponent {
  casos: Caso[] = []; 
  isLoggedIn: boolean = false; 
  noCasosAvailable: boolean = false; // Nueva propiedad para controlar si hay casos disponibles

  constructor(private http: HttpClient, private router: Router, private alertaService: AlertaService) {}

  ngOnInit(): void {
    const abogadoId = localStorage.getItem('abogadoId'); 
    console.log('Abogado ID desde localStorage:', abogadoId);
  
    this.isLoggedIn = !!abogadoId && this.verificarEstadoLogin();
    console.log('¿Usuario está logueado?', this.isLoggedIn);
  
    if (this.isLoggedIn) {
      this.http.get<Caso[]>(`http://localhost:8080/casos/${abogadoId}`).subscribe(
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
      this.alertaService.warning('No se ha encontrado un ID de abogado. Por favor, inicia sesión nuevamente.');
    }
  }

  private verificarEstadoLogin(): boolean {
    const token = localStorage.getItem('accessToken'); 
    return !!token; 
  }

  logout(): void {
    localStorage.removeItem('abogadoId');
    localStorage.removeItem('accessToken'); 
    this.router.navigate(['Login-Abogados']); 
    this.alertaService.success('Has cerrado sesión correctamente.', true); 
  }
}



  
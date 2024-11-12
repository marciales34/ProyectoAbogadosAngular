import { Component } from '@angular/core';
import { AdminMenuComponent } from "../admin-menu/admin-menu.component";
import { FooterComponent } from "../footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AlertaService } from '../servicios/alerta.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-datos-admin-cuenta',
  standalone: true,
  imports: [AdminMenuComponent, NgIf, FooterComponent],
  templateUrl: './datos-admin-cuenta.component.html',
  styleUrl: './datos-admin-cuenta.component.css'
})
export class DatosAdminCuentaComponent {

  abogado: any; // Cambia el tipo según tu modelo

  constructor(private http: HttpClient, private route: ActivatedRoute, private alertaService: AlertaService) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const abogadoId = localStorage.getItem('abogadoId');
      if (abogadoId) {
        this.http.get(`http://localhost:8080/Abogados/${abogadoId}`).subscribe(
          (response) => {
            this.abogado = response; // Asigna la respuesta a la variable abogado
          },
          (error) => {
            if (error.status === 404) {
              this.alertaService.error('Abogado no encontrado. Verifica que el ID sea correcto.');
            } else {
              console.error('Error al obtener los datos del abogado', error);
              this.alertaService.error('Error al obtener los datos, intenta de nuevo más tarde.');
            }
          }
        );
      } else {
        this.alertaService.error('No se ha encontrado un ID de abogado. Por favor, inicia sesión nuevamente.');
      }
    } else {
      console.error('localStorage no está disponible.');
    }
  }
  
}



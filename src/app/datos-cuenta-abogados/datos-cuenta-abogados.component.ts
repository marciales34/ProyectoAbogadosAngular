import { Component, OnInit } from '@angular/core';
import { EncabezadoComponent } from "../encabezado/encabezado.component";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { AlertaService } from '../servicios/alerta.service';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-datos-cuenta-abogados',
  standalone: true,
  imports: [EncabezadoComponent, NgIf, FooterComponent],
  templateUrl: './datos-cuenta-abogados.component.html',
  styleUrl: './datos-cuenta-abogados.component.css'
})
export class DatosCuentaAbogadosComponent implements OnInit {
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
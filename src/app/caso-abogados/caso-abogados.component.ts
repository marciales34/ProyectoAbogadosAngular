import { Component } from '@angular/core';
import { EncabezadoComponent } from "../encabezado/encabezado.component";
import { FooterComponent } from "../footer/footer.component";
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AlertaService } from '../servicios/alerta.service';
import { Caso } from '../caso'; // Asegúrate de importar tu interfaz

@Component({
  selector: 'app-caso-abogados',
  standalone: true,
  imports: [EncabezadoComponent, FooterComponent, NgFor],
  templateUrl: './caso-abogados.component.html',
  styleUrls: ['./caso-abogados.component.css']
})
export class CasoAbogadosComponent {
  casos: Caso[] = []; // Cambia el tipo según tu modelo

  constructor(private http: HttpClient, private route: ActivatedRoute, private alertaService: AlertaService) {}

  ngOnInit(): void {
    const casoId = localStorage.getItem('abogadoId'); // Suponiendo que guardas el ID del abogado en el localStorage
    if (casoId) {
      this.http.get<Caso[]>(`http://localhost:8080/Casos/${casoId}`).subscribe(
        (response: Caso[]) => { // Asegúrate de usar el tipo correcto aquí
          this.casos = response; // Asigna la respuesta a la variable casos
        },
        (error) => {
          if (error.status === 404) {
            this.alertaService.error('No se encontraron casos para este abogado.');
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
}

  
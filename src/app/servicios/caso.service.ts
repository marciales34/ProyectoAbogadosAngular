import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Caso } from '../caso'; // Asegúrate de tener un modelo de caso

@Injectable({
  providedIn: 'root',
})
export class CasoService {
  private baseUrl = 'http://localhost:8080/Casos'; // Cambia esto a tu URL real

  constructor(private http: HttpClient) {}

  // CasoService
getCasosByAbogadoId(abogadoId: number): Observable<Caso[]> {
  return this.http.get<Caso[]>(`${this.baseUrl}?id_abogado_encargado=${abogadoId}`);
}
}


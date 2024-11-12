import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Caso } from '../caso';  // Asegúrate de que tu clase Caso esté correctamente importada


@Injectable({
  providedIn: 'root'
})
export class ListaCasosService {
  private apiUrl = 'http://localhost:8080/casos';  // Cambia esto por la URL de tu API
  private apiUrlCrearCaso = 'http://localhost:8080/registra-casos';

  constructor(private http: HttpClient) {}

  // Listar todos los casos
  listarCasos(): Observable<Caso[]> {
    return this.http.get<Caso[]>(this.apiUrl);
  }

  // Crear un nuevo caso
  crearCaso(caso: Caso): Observable<Caso> {
    return this.http.post<Caso>(this.apiUrlCrearCaso, caso);
  }

  // Actualizar un caso existente
  actualizarCaso(id: number, caso: Caso): Observable<Caso> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Caso>(url, caso);
  }

  // Eliminar un caso
  eliminarCaso(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

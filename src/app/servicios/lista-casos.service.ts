import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaCasosService {

  private API_URI = "http://localhost:8080/casos";

  constructor(private http: HttpClient) { }

  ListarAbogados(): Observable<any[]> { // Cambia el tipo de retorno aquí
    return this.http.get<any[]>(`${this.API_URI}`); // Indica que esperas un array de cualquier tipo o ajusta al tipo específico si lo tienes
  }

   // Método para eliminar un caso
   eliminarCaso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URI}/${id}`);
  }
}
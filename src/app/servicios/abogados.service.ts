import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abogado } from '../abogado'; 

@Injectable({
  providedIn: 'root'
})
export class AbogadosService {

 
  private API_URI = "http://localhost:8080/Abogados";


  constructor(private http: HttpClient) { }

  ListarAbogados(): Observable<any[]> { // Cambia el tipo de retorno aquí
    return this.http.get<any[]>(`${this.API_URI}`); // Indica que esperas un array de cualquier tipo o ajusta al tipo específico si lo tienes
  }

  // Actualizar un abogado existente
  actualizarAbogado(id: number, abogado: Abogado): Observable<Abogado> {
    const url = `${this.API_URI}/${id}`;
    return this.http.put<Abogado>(url, abogado);
  }


  // Método para eliminar un caso
  eliminarAbogado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URI}/${id}`);

  }
}

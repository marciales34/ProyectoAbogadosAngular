import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AbogadosService {

 
  private API_URI = "http://localhost:8080/Abogados";

  constructor(private http: HttpClient) { }

  ListarAbogados(): Observable<any[]> { // Cambia el tipo de retorno aquí
    return this.http.get<any[]>(`${this.API_URI}`); // Indica que esperas un array de cualquier tipo o ajusta al tipo específico si lo tienes
  }
}

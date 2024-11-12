import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../clientes'; 

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private API_URI = "http://localhost:8080/Clientes";

  constructor(private http: HttpClient) { }

  ListarClientes(): Observable<any[]> { // Cambia el tipo de retorno aquí
    return this.http.get<any[]>(`${this.API_URI}`); // Indica que esperas un array de cualquier tipo o ajusta al tipo específico si lo tienes
  }
// Actualizar un abogado existente
actualizarCliente(id: number, cliente: Cliente): Observable<Cliente> {
  const url = `${this.API_URI}/${id}`;
  return this.http.put<Cliente>(url, cliente);
}
  

   // Método para eliminar un caso
   eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URI}/${id}`);
  }
}

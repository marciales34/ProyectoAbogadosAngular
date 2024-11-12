import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private API_URI = "http://localhost:8080/Clientes"; // Cambia la ruta según sea necesario

  constructor(private http: HttpClient) { }

  ListarClientes() {
    return this.http.get(`${this.API_URI}`);
  }

 
}

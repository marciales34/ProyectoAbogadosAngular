import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private API_URI = "http://localhost:8080/Clientes";

  constructor(private http: HttpClient) { }

  ListarClientes(){

    return this.http.get(`${this.API_URI}`);

  }
}

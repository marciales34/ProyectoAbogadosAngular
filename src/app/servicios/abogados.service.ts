import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AbogadosService {

  private API_URI = "http://localhost:8080/Abogados";

  constructor(private http: HttpClient) { }

  ListarAbogados(){

    return this.http.get(`${this.API_URI}`);

  }
}

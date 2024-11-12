import { Component, OnInit } from '@angular/core';  // Importar OnInit
import { CommonModule } from '@angular/common';
import { AdminMenuComponent } from '../admin-menu/admin-menu.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router'; // Importar Router
import { HttpClient } from '@angular/common/http'; // Importar HttpClient

@Component({
  selector: 'app-admin-principal',
  standalone: true,
  imports: [CommonModule, AdminMenuComponent, FooterComponent],
  templateUrl: './admin-principal.component.html',
  styleUrls: ['./admin-principal.component.css']
})
export class AdminPrincipalComponent implements OnInit {

  totalCasos: number = 0;      // Para almacenar el total de casos
  totalUsuarios: number = 0;   // Para almacenar el total de usuarios (abogados + clientes)

  // Fusión de los dos constructores en uno solo
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.getTotalCasos();
    this.getTotalUsuarios(); // Llama al método para obtener total de usuarios
  }

  getTotalCasos(): void {
    this.http.get<any>('http://localhost:8080/total-casos').subscribe(
      (response) => {
        this.totalCasos = response; // Asigna el total de casos
      },
      (error) => {
        console.error('Error obteniendo el total de casos', error);
      }
    );
  }

  getTotalUsuarios(): void {
    this.http.get<any>('http://localhost:8080/totalClientes').subscribe(
      (response) => {
        const totalClientes = response; // El valor ya es un número, no necesita ser tratado como un objeto
        this.totalUsuarios = totalClientes; // Asigna el total de clientes
        this.getTotalAbogados(); // Llama para obtener total de abogados
      },
      (error) => {
        console.error('Error obteniendo el total de usuarios', error);
        this.totalUsuarios = 0; // Asigna un valor por defecto en caso de error
      }
    );
}

getTotalAbogados(): void {
    this.http.get<any>('http://localhost:8080/totalAbogados').subscribe(
      (response) => {
        const totalAbogados = response; // Asegúrate de que sea un número
        this.totalUsuarios += totalAbogados; // Sumar los abogados al total de usuarios
      },
      (error) => {
        console.error('Error obteniendo el total de abogados', error);
        
      }
    );
}
  

  // Función para redirigir a la lista de casos
  redirigirListaCasos() {
    this.router.navigate(['/admin-lista-casosTotales']);
  }

  // Función para redirigir a la lista de abogados
  redirigirListaAbogados() {
    this.router.navigate(['/admin-lista-a']);
  }

  // Función para redirigir a la lista de usuarios
  redirigirListaUsuarios() {
    this.router.navigate(['/admin-lista-c']);
  }

  // Función para redirigir a la creación de usuarios
  redirigirCrearUsuario() {
    this.router.navigate(['/admin-crear-usuario']);
  }

  // Función para redirigir a la creación de casos
  redirigirCrearCaso() {
    this.router.navigate(['/admin-casos']);
  }
}

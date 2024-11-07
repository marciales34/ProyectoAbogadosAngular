import { Component, OnInit } from '@angular/core';
import { AdminMenuComponent } from '../admin-menu/admin-menu.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-crear-usuario',
  standalone: true,
  imports: [CommonModule, AdminMenuComponent, FooterComponent, FormsModule],
  templateUrl: './admin-crear-usuario.component.html',
  styleUrls: ['./admin-crear-usuario.component.css']
})
export class AdminCrearUsuarioComponent implements OnInit {
  
  // Modelo para el usuario
  usuario: any = {
    id: null,
    nombre: '',
    correo: '',
    contrasena: '', // Usado para clientes
    password: '',   // Usado para abogados
    telefono: '',
    rol: '',
    rama_id: null,  // Solo para abogados o admin
    edad: null,     // Solo para clientes
    direccion: ''   // Solo para clientes
  };

  // Lista de ramas del derecho
  ramasDerecho: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // Cargar las ramas del derecho desde el backend
    this.getRamasDerecho();
  }

  getRamasDerecho() {
    this.http.get<any[]>('http://localhost:8080/ramasDerecho').subscribe(
      (response) => {
        this.ramasDerecho = response;
      },
      (error) => {
        console.error('Error al obtener las ramas del derecho', error);
      }
    );
  }
  
  volverAdminPrincipal() {
    this.router.navigate(['/admin-principal']);
  }

  onRolChange(event: any) {
    const rolSeleccionado = event.target.value;
    this.usuario.rol = rolSeleccionado; // Asigna el rol seleccionado
    if (rolSeleccionado === 'cliente') {
      this.usuario.rama_id = null; // Limpiar rama_id si es cliente
      this.usuario.password = '';   // Limpiar password si es cliente
    } else if (rolSeleccionado === 'abogado') {
      this.usuario.edad = null;
      this.usuario.direccion = null;
    } else if (rolSeleccionado === 'admin') {
      this.usuario.edad = null;
      this.usuario.direccion = null;
    }
  }

  crearUsuario() {
    const usuarioEnvio: any = {
      ...this.usuario,
      // Asigna la contraseña correcta según el rol
      password: this.usuario.rol === 'cliente' ? this.usuario.contrasena : this.usuario.password,
      contrasena: this.usuario.rol === 'cliente' ? this.usuario.contrasena : undefined
    };

    const url = this.usuario.rol === 'cliente' ? 'http://localhost:8080/crearCliente' : 'http://localhost:8080/Enviar';

    console.log('Datos a enviar:', usuarioEnvio); 
    
    this.http.post(url, usuarioEnvio).subscribe(
      (response) => {
        console.log('Usuario creado con éxito', response);
        if (this.usuario.rol === 'abogado' || this.usuario.rol === 'admin') {
          this.router.navigate(['/admin-lista-a']);
        } else {
          this.router.navigate(['/admin-lista-c']);
        }
      },
      (error) => {
        console.error('Error al crear el usuario', error);
        alert('Error: ' + (error.error.message || 'Error al crear el usuario')); // Mostrar mensaje de error
      }
    );
  }
}

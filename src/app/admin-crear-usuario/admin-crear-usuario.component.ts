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
  imports: [CommonModule, AdminMenuComponent, FooterComponent,FormsModule],
  templateUrl: './admin-crear-usuario.component.html',
  styleUrls: ['./admin-crear-usuario.component.css']
})
export class AdminCrearUsuarioComponent implements OnInit {

  // Modelo para el usuario
  usuario: any = {
    id: null,
    nombre: '',
    correo: '',
    contrasena: '',
    telefono: '',
    rol: '',
    rama_id: null,  // Solo para abogados
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

  // Método para obtener las ramas del derecho
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

  // Método para manejar el cambio de rol
  onRolChange(event: any) {
    const rolSeleccionado = event.target.value;
    if (rolSeleccionado === 'cliente') {
      // Limpiar los campos específicos de abogado si se selecciona cliente
      this.usuario.rama_id = null;
    } else if (rolSeleccionado === 'abogado') {
      // Limpiar los campos específicos de cliente si se selecciona abogado
      this.usuario.edad = null;
      this.usuario.direccion = '';
    }
  }

  // Método para enviar el formulario
  crearUsuario() {
    // Definir la URL del endpoint (ajustar según tu backend)
    const url = this.usuario.rol === 'cliente' ? 'http://localhost:8080/crearCliente' : 'http://localhost:8080/crearAbogado';
    
    // Enviar el usuario al backend
    this.http.post(url, this.usuario).subscribe(
      (response) => {
        console.log('Usuario creado con éxito', response);
        // Redirigir después de crear el usuario, por ejemplo, a la lista de usuarios
        this.router.navigate(['/admin-lista-c']);
      },
      (error) => {
        console.error('Error al crear el usuario', error);
      }
    );
  }

}
import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaService } from '../servicios/alerta.service'; 

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [NgIf],
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private alerta: AlertaService
  ) {}

  // Método para comprobar si el usuario está conectado
  loggedIn(): boolean {
    return isPlatformBrowser(this.platformId) && !!localStorage.getItem('username');
  }

  // Método para obtener el nombre del usuario
  getUsername(): string {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('username') || '' : '';
  }

  getUserRole(): string {
    const rol = isPlatformBrowser(this.platformId) ? localStorage.getItem('rol') || 'Invitado' : 'Invitado';
    console.log('Rol recuperado:', rol); // Depuración para ver el valor del rol
    return rol;
  }
  
  


  // Método para manejar el cierre de sesión
logout() {
  if (isPlatformBrowser(this.platformId)) {
    this.alerta.confirmLogout('Confirmación', '¿Estás seguro de que deseas cerrar sesión?')
      .then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('username'); // Elimina el nombre de usuario del localStorage
          localStorage.removeItem('abogadoId'); // Elimina el ID del abogado del localStorage
          localStorage.removeItem('accessToken'); // Elimina el token de acceso del localStorage, si es que estás utilizando uno
          this.alerta.success('¡Tu sesión ha finalizado exitosamente!', true); // Muestra un mensaje de éxito
          this.router.navigate(['/InicioPaginaPrincipal']); // Redirige a la página principal
        }
      });
  }
}


  redirigirInicio() {
    this.router.navigate(['/InicioPaginaPrincipal']); 
  }

  redirigirALogin() {
    this.router.navigateByUrl('/Login-Abogados'); 
  }

  redirigirADatosCuentaAbogados() {
    this.router.navigateByUrl('/Datos-Abogados'); 
  }

  redirigirACasosAbogados() {
    this.router.navigateByUrl('/Casos-Abogados'); 
  }

  redirigirARegistroCasosAbogados() {
    this.router.navigateByUrl('/Registro-Casos-Abogados'); 
  }

  redirigirAContacto() {
    this.router.navigateByUrl('/Contacto'); 
  }

  
}


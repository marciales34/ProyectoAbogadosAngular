import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router'; 
import { AlertaService } from '../servicios/alerta.service'; 

@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [NgIf],
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private alerta: AlertaService
  ) {}
 
  redirigirALogin() {
    this.router.navigateByUrl('/Login-Abogados'); 
  }

  

  redirigirAdminPrincipal() {
    this.router.navigate(['/admin-principal']); 
  }

  redirigirAdminUsuarios() {
    this.router.navigate(['/admin-lista-usuarios']);
  }

  redirigirAdminCasos() {
    this.router.navigate(['/admin-casos']);
  }
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
  loggedIn(): boolean {
    return isPlatformBrowser(this.platformId) && !!localStorage.getItem('username');
  }

  // Método para obtener el nombre del usuario
  getUsername(): string {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('username') || '' : '';
  }

}

import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor() { }

  success(message: string, p0: boolean) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 2000
    });
  }

  error(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message
    });
  }

  warning(message: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Warning',
      text: message
    });
  }

  info(message: string) {
    Swal.fire({
      icon: 'info',
      title: 'Info',
      text: message
    });
  }

  confirm(title: string, text: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'custom-ok-button',
        cancelButton: 'custom-cancel-button'
      }
    });
  }

  confirmEdit(title: string, text: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Editar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'custom-ok-button',
        cancelButton: 'custom-cancel-button'
      }
    });
  }

  confirmLogout(title: string, text: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'custom-ok-button',
        cancelButton: 'custom-cancel-button'
      }
    });
  }

  confirmSave(title: string, text: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Guardar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'custom-ok-button',
        cancelButton: 'custom-cancel-button'
      }
    });
  }
}

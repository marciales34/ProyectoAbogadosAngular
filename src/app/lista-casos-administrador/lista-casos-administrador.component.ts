import { Component, OnInit } from '@angular/core';
import { AbogadosService } from '../servicios/abogados.service';
import { ListaCasosService } from '../servicios/lista-casos.service';
import { EncabezadoComponent } from "../encabezado/encabezado.component";
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminMenuComponent } from "../admin-menu/admin-menu.component";
import { Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { AlertaService } from '../servicios/alerta.service';

@Component({
  selector: 'app-lista-casos-administrador',
  standalone: true,
  imports: [NgFor, HttpClientModule, AdminMenuComponent, FooterComponent],
  templateUrl: './lista-casos-administrador.component.html',
  styleUrl: './lista-casos-administrador.component.css'
})
export class ListaCasosAdministradorComponent implements OnInit{

  datos: any =[];
  constructor(private CasosServicio: ListaCasosService, private router: Router, private alertaService: AlertaService){}
ngOnInit(): void {

    this.listarCasosabogados();
  
}

listarCasosabogados(){

  this.CasosServicio.ListarAbogados().subscribe(
    res =>{

        console.log(res)
        this.datos = res;

    },

    err => console.log(err)

  );
  

}

// Método para manejar la eliminación de un caso
eliminarCaso(id: number) {
  this.alertaService.confirm(
    '¿Estás seguro de eliminar este caso?',
    'Esta acción no se puede deshacer. ¿Deseas continuar?'
  ).then((result) => {
    // Verifica si el usuario presionó el botón de confirmación
    if (result.isConfirmed) { // Solo si el usuario confirma
      this.CasosServicio.eliminarCaso(id).subscribe(
        () => {
          this.alertaService.success('Caso eliminado con éxito.', true);
          this.listarCasosabogados(); // Refresca la lista de casos
        },
        (error) => {
          console.error('Error al eliminar el caso', error);
          this.alertaService.error('Hubo un error al eliminar el caso. Intenta de nuevo más tarde.');
        }
      );
    } else {
      console.log('Eliminación cancelada por el usuario.'); // Mensaje para debug
    }
  }).catch((error) => {
    console.error('Error en la confirmación', error);
  });
}



volverAdminPrincipal() {
  this.router.navigate(['/admin-principal']);
}

}




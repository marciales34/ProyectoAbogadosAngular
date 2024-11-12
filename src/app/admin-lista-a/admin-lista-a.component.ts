import { Component, OnInit } from '@angular/core';
import { AdminMenuComponent } from '../admin-menu/admin-menu.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { AbogadosService } from '../servicios/abogados.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertaService } from '../servicios/alerta.service';


@Component({
  selector: 'app-admin-lista-a',
  standalone: true,
  imports: [CommonModule, AdminMenuComponent, FooterComponent, NgFor, HttpClientModule],
  templateUrl: './admin-lista-a.component.html',
  styleUrl: './admin-lista-a.component.css'
})
export class AdminListaAComponent implements OnInit  {
  datos: any =[];
  constructor(private AbogadoServicio: AbogadosService,private router: Router, private alertaService: AlertaService){}
ngOnInit(): void {

    this.listarabogados();
  
}

listarabogados(){

  this.AbogadoServicio.ListarAbogados().subscribe(
    res =>{

        console.log(res)
        this.datos = res;

    },

    err => console.log(err)

  );

}

eliminarAbogado(id: number) {
  this.alertaService.confirm(
    '¿Estás seguro de eliminar este Abogado?',
    'Esta acción no se puede deshacer. ¿Deseas continuar?'
  ).then((result) => {
    // Verifica si el usuario presionó el botón de confirmación
    if (result.isConfirmed) { // Solo si el usuario confirma
      this.AbogadoServicio.eliminarAbogado(id).subscribe(
        () => {
          this.alertaService.success('Abogado eliminado con éxito.', true);
          this.listarabogados(); // Refresca la lista de abogados
        },
        (error) => {
          console.error('Error al eliminar el abogado', error);
          this.alertaService.error('Hubo un error al eliminar el abogado. Intenta de nuevo más tarde.');
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

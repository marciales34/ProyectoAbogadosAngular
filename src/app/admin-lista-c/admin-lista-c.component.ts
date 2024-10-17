import { Component, OnInit } from '@angular/core';
import { AdminMenuComponent } from '../admin-menu/admin-menu.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ClientesService } from '../servicios/clientesAdmin.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-lista-clientes',
  standalone: true,
  imports: [CommonModule, AdminMenuComponent, FooterComponent, NgFor, HttpClientModule],
  templateUrl: './admin-lista-c.component.html',
  styleUrls: ['./admin-lista-c.component.css'] // Asegúrate de que el nombre del archivo sea correcto
})
export class AdminListaClientesComponent implements OnInit  {
  datos: any = [];
  
  constructor(private ClientesServicio: ClientesService, private router: Router) {}

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes() {
    this.ClientesServicio.ListarClientes().subscribe(
      res => {
        console.log(res);
        this.datos = res;
      },
      err => console.log(err)
    );
  }

  volverAdminPrincipal() {
    this.router.navigate(['/admin-principal']);
  }
}

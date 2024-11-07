import { Component, OnInit } from '@angular/core';
import { EncabezadoComponent } from "../encabezado/encabezado.component";
import { FooterComponent } from "../footer/footer.component";
import { NgFor, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ClientesService } from '../servicios/clientesAdmin.service';

@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [EncabezadoComponent, NgFor, CommonModule, HttpClientModule, FooterComponent],
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {
  casos: any[] = [];
  datos: any = [];
  
  // Agrega estas propiedades para evitar los errores
  isLoggedIn: boolean = false; // Cambia el valor según la lógica de autenticación
  noCasosAvailable: boolean = false; // Cambia el valor según la lógica de tus datos

  constructor(private ClienteServicio: ClientesService) {}

  ngOnInit(): void {
    this.ListarClientes();
  }

  ListarClientes() {
    this.ClienteServicio.ListarClientes().subscribe(
      res => {
        console.log(res);
        this.datos = res;

        // Actualiza 'noCasosAvailable' según la cantidad de datos
        this.noCasosAvailable = this.datos.length === 0;
      },
      err => console.log(err)
    );
  }
}

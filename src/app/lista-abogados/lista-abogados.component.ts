import { Component, OnInit } from '@angular/core';
import { EncabezadoComponent } from "../encabezado/encabezado.component";
import { NgFor } from '@angular/common';
import { AbogadosService } from '../servicios/abogados.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-lista-abogados',
  standalone: true,
  imports: [EncabezadoComponent, NgFor, HttpClientModule,],
  templateUrl: './lista-abogados.component.html',
  styleUrl: './lista-abogados.component.css'
})
export class ListaAbogadosComponent implements OnInit {

  datos: any =[];
  constructor(private AbogadoServicio: AbogadosService){}
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

}

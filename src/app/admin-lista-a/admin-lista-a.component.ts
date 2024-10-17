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


@Component({
  selector: 'app-admin-lista-a',
  standalone: true,
  imports: [CommonModule, AdminMenuComponent, FooterComponent, NgFor, HttpClientModule],
  templateUrl: './admin-lista-a.component.html',
  styleUrl: './admin-lista-a.component.css'
})
export class AdminListaAComponent implements OnInit  {
  datos: any =[];
  constructor(private AbogadoServicio: AbogadosService,private router: Router){}
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
volverAdminPrincipal() {
  this.router.navigate(['/admin-principal']);
}

}

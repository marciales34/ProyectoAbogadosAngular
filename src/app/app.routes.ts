import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAbogadosComponent } from './lista-abogados/lista-abogados.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginAbogadosComponent } from './login-abogados/login-abogados.component';
import { InicioPaginaPrincipalComponent } from './inicio-pagina-principal/inicio-pagina-principal.component';
import { DatosCuentaAbogadosComponent } from './datos-cuenta-abogados/datos-cuenta-abogados.component';
import { CasoAbogadosComponent } from './caso-abogados/caso-abogados.component';
import { RegistroCasosAbogadoComponent } from './registro-casos-abogado/registro-casos-abogado.component';
import { ContactoAbogadosComponent } from './contacto-abogados/contacto-abogados.component';

export const routes: Routes = [
    {
        path:"",
        redirectTo:"/InicioPaginaPrincipal",
        pathMatch:"full"},
        
        {path:"Lista-Abogados", component:ListaAbogadosComponent},
        {path:"Login-Abogados", component:LoginAbogadosComponent},
        {path:"InicioPaginaPrincipal", component:InicioPaginaPrincipalComponent},
        {path:"Datos-Abogados", component:DatosCuentaAbogadosComponent},
        {path:"Casos-Abogados", component:CasoAbogadosComponent},
        {path:"Registro-Casos-Abogados", component:RegistroCasosAbogadoComponent},
        {path:"Contacto", component:ContactoAbogadosComponent},


];

@NgModule({
    imports: [RouterModule.forRoot(routes), HttpClientModule ],
    exports: [RouterModule, HttpClientModule ]
  })
  export class AppRoutingModule { }

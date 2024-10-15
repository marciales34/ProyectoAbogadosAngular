import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAbogadosComponent } from './lista-abogados/lista-abogados.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginAbogadosComponent } from './login-abogados/login-abogados.component';
import { InicioPaginaPrincipalComponent } from './inicio-pagina-principal/inicio-pagina-principal.component';

export const routes: Routes = [
    {
        path:"",
        redirectTo:"/InicioPaginaPrincipal",
        pathMatch:"full"},
        
        {path:"Lista-Abogados", component:ListaAbogadosComponent},
        {path:"Login-Abogados", component:LoginAbogadosComponent},
        {path:"InicioPaginaPrincipal", component:InicioPaginaPrincipalComponent},


];

@NgModule({
    imports: [RouterModule.forRoot(routes), HttpClientModule ],
    exports: [RouterModule, HttpClientModule ]
  })
  export class AppRoutingModule { }

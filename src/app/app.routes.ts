import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAbogadosComponent } from './lista-abogados/lista-abogados.component';
import { HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
    {
        path:"",
        redirectTo:"/lista-abogados",
        pathMatch:"full"
    },{
        path:"lista-abogados",
        component:ListaAbogadosComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes), HttpClientModule ],
    exports: [RouterModule, HttpClientModule ]
  })
  export class AppRoutingModule { }

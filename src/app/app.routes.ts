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
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';

import { AdminPrincipalComponent } from './admin-principal/admin-principal.component';
import { AdminListaUsuariosComponent } from './admin-lista-usuarios/admin-lista-usuarios.component';
import { AdminCasosComponent} from './admin-casos/admin-casos.component';
import { AdminCrearUsuarioComponent } from './admin-crear-usuario/admin-crear-usuario.component';
import { AdminListaAComponent} from './admin-lista-a/admin-lista-a.component';
import { AdminListaClientesComponent} from './admin-lista-c/admin-lista-c.component';
import { DatosAdminCuentaComponent } from './datos-admin-cuenta/datos-admin-cuenta.component';


export const routes: Routes = [
    {
        path: "",
        redirectTo: "/Lista-Clientes",
        pathMatch: "full"
    },
    { path: "Lista-Abogados", component: ListaAbogadosComponent },
    {path: "Lista-Clientes",component:ListaClientesComponent},
    { path: "Login-Abogados", component: LoginAbogadosComponent },
    { path: "InicioPaginaPrincipal", component: InicioPaginaPrincipalComponent },
    { path: "Datos-Abogados", component: DatosCuentaAbogadosComponent },
    { path: "Casos-Abogados", component: CasoAbogadosComponent },
    { path: "Registro-Casos-Abogados", component: RegistroCasosAbogadoComponent },
    { path: "Contacto", component: ContactoAbogadosComponent },
    { path: "admin-principal", component: AdminPrincipalComponent },
    { path: "admin-lista-usuarios", component: AdminListaUsuariosComponent },
    { path: "admin-casos", component: AdminCasosComponent },
    { path: "admin-crear-usuario", component: AdminCrearUsuarioComponent },
    { path: "admin-lista-a", component: AdminListaAComponent },
    { path: "admin-lista-c", component: AdminListaClientesComponent },
<<<<<<< HEAD
    { path: "admin-lista-cuenta", component: DatosAdminCuentaComponent },
=======
    
   
>>>>>>> 5217ae99b4a250cf906d188fd812ba8d02b4bbb3

];

@NgModule({
    imports: [RouterModule.forRoot(routes), HttpClientModule],
    exports: [RouterModule, HttpClientModule]
})
export class AppRoutingModule { }

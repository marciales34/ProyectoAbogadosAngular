import { Component } from '@angular/core';
import { EncabezadoComponent } from "../encabezado/encabezado.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-inicio-pagina-principal',
  standalone: true,
  imports: [EncabezadoComponent, FooterComponent],
  templateUrl: './inicio-pagina-principal.component.html',
  styleUrl: './inicio-pagina-principal.component.css'
})
export class InicioPaginaPrincipalComponent {

}

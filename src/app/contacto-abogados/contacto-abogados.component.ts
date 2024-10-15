import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { EncabezadoComponent } from "../encabezado/encabezado.component";

@Component({
  selector: 'app-contacto-abogados',
  standalone: true,
  imports: [FooterComponent, EncabezadoComponent],
  templateUrl: './contacto-abogados.component.html',
  styleUrl: './contacto-abogados.component.css'
})
export class ContactoAbogadosComponent {

}

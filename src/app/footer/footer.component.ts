import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(
    private router: Router,
    
  ) {}


  redirigirInicio() {
    this.router.navigate(['/InicioPaginaPrincipal']); 
  }

  redirigirDatos() {
    this.router.navigate(['/Datos-Abogados']); 
  }

}

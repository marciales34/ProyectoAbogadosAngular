import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertaService } from '../servicios/alerta.service';
import { NgIf } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-login-abogados',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login-abogados.component.html',
  styleUrls: ['./login-abogados.component.css']
})
export class LoginAbogadosComponent {

  // Formularios para registro e inicio de sesión
  formularioRegistro: FormGroup;
  formularioLogin: FormGroup;

  constructor(
    private elementRef: ElementRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private alertaService: AlertaService
  ) {
    this.formularioRegistro = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', [Validators.required]],
      rama_id: ['', Validators.required]
    });

    // Inicializar el formulario de inicio de sesión
    this.formularioLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  
  }
 
  onSubmitRegistro(): void {
    if (this.formularioRegistro.valid) {
        const formData = this.formularioRegistro.value;

        this.http.post('http://localhost:8080/Enviar', formData).subscribe(
            (response: any) => {
                const abogadoId = response.id; // Asegúrate de que `response` tiene el campo `id`
                const accessToken = response.token; // Si no tienes el token, quita esta línea

                localStorage.setItem('username', formData.nombre); 
                localStorage.setItem('abogadoId', abogadoId);
                localStorage.setItem('accessToken', accessToken); // Guardar el token (si lo tienes)

                this.alertaService.success(response.message, true);
                this.router.navigate(['/Lista-Abogados']);
            },
            (error) => {
                // Manejar el error de conflicto
                if (error.status === 409) {
                    const errorMessage = error.error.message || 'Error al registrar';
                    this.alertaService.error(errorMessage);
                } else {
                    this.alertaService.error('Error al registrar, intenta de nuevo');
                }
                console.error('Error al registrar', error);
            }
        );
    } else {
        console.log('Formulario de registro inválido', this.formularioRegistro.errors);
    }
}



onSubmitLogin(): void {
  if (this.formularioLogin.valid) {
    const loginData = this.formularioLogin.value;
    this.http.post<any>('http://localhost:8080/login', loginData).subscribe(
      (response) => {
        const nombreUsuario = response.nombre;
        const abogadoId = response.id; // Asegúrate de que `response` tiene el campo `id`
        const accessToken = response.token; // Asegúrate de que `response` tiene el token

        localStorage.setItem('username', nombreUsuario);
        localStorage.setItem('abogadoId', abogadoId.toString());
        localStorage.setItem('accessToken', accessToken); // Guardar el token
        this.alertaService.success('Login exitoso', true);
        this.router.navigate(['/Lista-Abogados']);
      },
      (error) => {
        if (error.status === 401) {
          this.alertaService.error('Credenciales incorrectas. Por favor, intenta de nuevo.');
        } else {
          console.error('Error en el inicio de sesión', error);
          this.alertaService.error('Error al iniciar sesión, intenta de nuevo más tarde.');
        }
      }
    );
  } else {
    console.log('Formulario de inicio de sesión inválido');
  }
}





  // Animación entre panel de registro e inicio de sesión
  ngAfterViewInit(): void {
    const signUpButton = this.elementRef.nativeElement.querySelector('#signUp');
    const signInButton = this.elementRef.nativeElement.querySelector('#signIn');
    const container = this.elementRef.nativeElement.querySelector('#container');

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
  }
}

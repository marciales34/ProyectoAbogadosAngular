import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertaService } from '../servicios/alerta.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-abogados',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login-abogados.component.html',
  styleUrls: ['./login-abogados.component.css']
})
export class LoginAbogadosComponent implements OnInit {

  formularioRegistro: FormGroup;
  formularioLogin: FormGroup;

  constructor(
    private elementRef: ElementRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private alertaService: AlertaService
  ) {
    // Formulario de registro
    this.formularioRegistro = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Validación para asegurar que solo sean números
      direccion: ['', [Validators.required]] // Validación para asegurar que el campo no esté vacío
    });

    // Formulario de login
    this.formularioLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      tipoUsuario: ['', Validators.required] // Agrega este campo
    });
  }

  ngOnInit(): void {
    const signUpButton = this.elementRef.nativeElement.querySelector('#signUp');
    const signInButton = this.elementRef.nativeElement.querySelector('#signIn');
    const container = this.elementRef.nativeElement.querySelector('#container');

    if (signUpButton && signInButton && container) {
      signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
      });

      signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
      });
    } else {
      console.error('No se encontraron los elementos de signUp, signIn o container');
    }
  }

  onSubmitRegistro(): void {
    if (this.formularioRegistro.valid) {
      const formData = this.formularioRegistro.value;
  
      console.log('Datos enviados al servidor:', formData);
  
      this.http.post('http://localhost:8080/RegistrarCliente', formData).subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);
          const abogadoId = response.id;
          const accessToken = response.token;
  
          localStorage.setItem('username', formData.nombre);
          localStorage.setItem('abogadoId', abogadoId);
          localStorage.setItem('accessToken', accessToken);
  
          this.alertaService.success(response.message, true);
          this.router.navigate(['/clientes']);
        },
        (error) => {
          // Revisar el contenido del error más detalladamente
          console.error('Error de registro:', error);
          if (error.status === 409) {
            const errorMessage = error.error?.message || 'El correo ya está registrado';
            this.alertaService.error(errorMessage);
          } else {
            this.alertaService.error('Error al registrar, intenta de nuevo');
          }
        }
      );
    } else {
      console.log('Formulario de registro inválido', this.formularioRegistro.errors);
    }
  }
  

  onSubmitLogin(): void {
    if (this.formularioLogin.valid) {
      const tipoUsuario = this.formularioLogin.value.tipoUsuario;

      if (tipoUsuario === 'cliente') {
        this.onSubmitLoginCliente(); // Llamada al método específico para clientes
      } else {
        this.onSubmitLoginAbogado(); // Llamada al método específico para abogados
      }
    } else {
      console.log('Formulario de inicio de sesión inválido');
    }
  }

  onSubmitLoginCliente(): void {
    if (this.formularioLogin.valid) {
      const loginData = {
        correo: this.formularioLogin.value.correo,
        contrasena: this.formularioLogin.value.password
      };

      console.log('Datos de inicio de sesión para cliente:', loginData);

      this.http.post<any>('http://localhost:8080/login-clientes', loginData).subscribe(
        (response) => {
          console.log('Respuesta del servidor para cliente:', response);

          if (response.nombre && response.id) {
            const nombreUsuario = response.nombre;
            const clienteId = response.id;
            const accessToken = response.token;

            localStorage.setItem('username', nombreUsuario);
            localStorage.setItem('clienteId', clienteId.toString());
            localStorage.setItem('accessToken', accessToken);

            this.router.navigate(['/clientes']);
            this.alertaService.success('Login exitoso', true);
          } else {
            this.alertaService.error('Datos de usuario incorrectos');
          }
        },
        (error) => {
          if (error.status === 401) {
            this.alertaService.error('Credenciales incorrectas. Por favor, intenta de nuevo.');
          } else {
            console.error('Error en el inicio de sesión para cliente:', error);
            this.alertaService.error('Error al iniciar sesión, intenta de nuevo más tarde.');
          }
        }
      );
    } else {
      console.log('Formulario de inicio de sesión inválido');
    }
  }

  onSubmitLoginAbogado(): void {
    const loginData = {
      correo: this.formularioLogin.value.correo,
      password: this.formularioLogin.value.password,
    };

    this.http.post<any>('http://localhost:8080/login', loginData).subscribe(
      (response) => {
        const nombreUsuario = response.nombre;
        const abogadoId = response.id;
        const accessToken = response.token;

        localStorage.setItem('username', nombreUsuario);
        localStorage.setItem('abogadoId', abogadoId.toString());
        localStorage.setItem('accessToken', accessToken);

        if (response.rol === 'admin') {
          this.router.navigate(['/admin-principal']);
        } else {
          this.router.navigate(['/InicioPaginaPrincipal']);
        }

        this.alertaService.success('Login exitoso', true);
      },
      (error) => {
        if (error.status === 401) {
          this.alertaService.error('Credenciales incorrectas. Por favor, intenta de nuevo.');
        } else {
          console.error('Error en el inicio de sesión para abogado:', error);
          this.alertaService.error('Error al iniciar sesión, intenta de nuevo más tarde.');
        }
      }
    );
  }
}

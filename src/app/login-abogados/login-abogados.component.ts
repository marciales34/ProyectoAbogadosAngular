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
  formularioRegistroCliente: FormGroup; 
  formularioLogin: FormGroup;

  constructor(
    private elementRef: ElementRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private alertaService: AlertaService
  ) {
    //----Intento de sebas
    this.formularioRegistro = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', [Validators.required]],
      rama_id: ['', Validators.required]
    });

    // Formulario para registrar clientes-
    this.formularioRegistroCliente = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', [Validators.required]]
    });

    // Inicializar el formulario de inicio de sesión
    this.formularioLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      tipoUsuario: ['', Validators.required]  // Agrega este campo
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

  // Método para registrar abogados
  onSubmitRegistro(): void {
    if (this.formularioRegistro.valid) {
      const formData = this.formularioRegistro.value;

      this.http.post('http://localhost:8080/Enviar', formData).subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);
          const abogadoId = response.id;
          const accessToken = response.token;

          localStorage.setItem('username', formData.nombre); 
          localStorage.setItem('abogadoId', abogadoId);
          localStorage.setItem('accessToken', accessToken);

          this.alertaService.success(response.message, true);
          this.router.navigate(['/Lista-Abogados']);
        },
        (error) => {
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

  // Método para registrar clientes
  onSubmitRegistroCliente(): void {
    if (this.formularioRegistroCliente.valid) {
      const formData = this.formularioRegistroCliente.value;

      this.http.post('http://localhost:8080/RegistrarCliente', formData).subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);
          const clienteId = response.id;
          const accessToken = response.token;

          localStorage.setItem('username', formData.nombre); 
          localStorage.setItem('clienteId', clienteId);
          localStorage.setItem('accessToken', accessToken);

          this.alertaService.success(response.message, true);
          this.router.navigate(['/clientes']);
        },
        (error) => {
          if (error.status === 409) {
            const errorMessage = error.error.message || 'Error al registrar cliente';
            this.alertaService.error(errorMessage);
          } else {
            this.alertaService.error('Error al registrar cliente, intenta de nuevo');
          }
          console.error('Error al registrar cliente', error);
        }
      );
    } else {
      console.log('Formulario de registro de cliente inválido', this.formularioRegistroCliente.errors);
    }
  }

//Intento de sebas 
  onSubmitLogin(): void {
    if (this.formularioLogin.valid) {
        const loginData = this.formularioLogin.value;
        const tipoUsuario = loginData.tipoUsuario; // Esto obtiene el tipo de usuario (cliente o abogado)
        let url = '';

        // Dependiendo del tipo de usuario, hacemos la petición a la URL correspondiente
        if (tipoUsuario === 'abogado') {
            url = 'http://localhost:8080/login'; // Login para abogados
        } else if (tipoUsuario === 'cliente') {
            url = 'http://localhost:8080//login-clientes'; // Login para clientes
        } else {
            this.alertaService.error('Por favor, selecciona un tipo de usuario.');
            return;
        }

        this.http.post<any>(url, loginData).subscribe(
            (response) => {
                console.log('Respuesta del servidor:', response);
                const nombreUsuario = response.nombre;
                const userId = response.id;
                const rol = response.rol;
                const accessToken = response.token;

                localStorage.setItem('username', nombreUsuario);
                localStorage.setItem('userId', userId.toString());
                localStorage.setItem('accessToken', accessToken);

                // Redirigir dependiendo del rol
                if (rol === 'admin') {
                    this.router.navigate(['/admin-principal']);
                } else if (rol === 'abogado') {
                    this.router.navigate(['/InicioPaginaPrincipal']);
                } else if (rol === 'cliente') {
                    this.router.navigate(['/clientes']);
                } else {
                    this.alertaService.error('Rol no válido, intente de nuevo.');
                }

                this.alertaService.success('Login exitoso', true);
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
//------------------
  onSubmitLoginCliente(): void {
    if (this.formularioLogin.valid) {
      const loginData = {
        correo: this.formularioLogin.value.correo,
        contrasena: this.formularioLogin.value.password // Cambia 'password' a 'contrasena'
      };
  
      this.http.post<any>('http://localhost:8080/login-clientes', loginData).subscribe(
        (response) => {
          this.router.navigate(['/clientes']);
          console.log('Respuesta del servidor:', response);
          const nombreUsuario = response.nombre;

          localStorage.setItem('username', nombreUsuario);
          this.alertaService.success('Login exitoso', true);
        },
        (error) => {
          if (error.status === 401) {
            this.alertaService.error('Credenciales incorrectas. Por favor, intenta de nuevo.');
          } else {
            console.error('Error en el inicio de sesión:', error);
            this.alertaService.error('Error al iniciar sesión, intenta de nuevo más tarde.');
          }
        }
      );
    } else {
      console.log('Formulario de inicio de sesión inválido');
    }
  }
  
}
  

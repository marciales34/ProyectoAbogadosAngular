import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { EncabezadoComponent } from '../encabezado/encabezado.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertaService } from '../servicios/alerta.service';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { SweetAlertResult } from 'sweetalert2';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-registro-casos-abogado',
  standalone: true,
  imports: [EncabezadoComponent, ReactiveFormsModule, NgIf, FooterComponent],
  templateUrl: './registro-casos-abogado.component.html',
  styleUrls: ['./registro-casos-abogado.component.css'],
})
export class RegistroCasosAbogadoComponent implements OnInit {
  // Formulario para registrar casos
  formularioCaso: FormGroup;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private elementRef: ElementRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private alertaService: AlertaService
  ) {
    this.formularioCaso = this.fb.group({
      id_abogado: [{ value: '', disabled: true }, Validators.required],
      id_cliente: [{ value: '', disabled: true }], // Campo solo lectura
      correo_cliente: ['', [Validators.required, Validators.email]],
      estado_caso: ['', Validators.required],
      descripcion_caso: ['', [Validators.required, Validators.minLength(10)]],
      evidencia: [''], // Campo de evidencias
      testimonios: [''], // Campo de testimonios
      rama_id: ['', Validators.required],
    });
  }

  onSubmitCaso(): void {
    // Verificar si el abogado ha iniciado sesión buscando el ID del abogado
    const idAbogado = localStorage.getItem('abogadoId');
  
    // Si no hay un abogado registrado en localStorage, mostramos la alerta
    if (!idAbogado) {
      this.alertaService.error(
        'Primero debes iniciar sesión antes de registrar un caso.'
      );
      return; // Salimos de la función sin enviar el caso
    }
  
    // Llamar a buscarCliente y esperar su resolución
    this.buscarCliente().then((clienteId) => {
      // Obtener el ID del abogado desde localStorage antes de enviar el formulario
      const idAbogado = localStorage.getItem('abogadoId');
  
      // Verificar si se obtuvo el ID del abogado
      if (!idAbogado) {
        console.error('No se puede enviar el caso, id_abogado no está definido');
        this.alertaService.error('El ID del abogado no está disponible.');
        return;
      }
  
      // Verificar que el id_cliente está definido después de buscar
      if (!clienteId) {
        console.error('No se puede enviar el caso, id_cliente no está definido');
        this.alertaService.error('Primero busca un cliente por correo.');
        return;
      }
  
      // Construir el objeto a enviar
      const casoData = {
        id_cliente: clienteId,
        descripcion_caso: this.formularioCaso.value.descripcion_caso,
        estado_caso: this.formularioCaso.value.estado_caso,
        evidencia: this.formularioCaso.value.evidencia,
        rama_id: this.formularioCaso.value.rama_id, // Esto ahora debe contener el ID de la rama
        testimonios: this.formularioCaso.value.testimonios,
        id_abogado_encargado: idAbogado, // Asignar el ID del abogado aquí
      };
  
      console.log('Datos del caso a registrar:', casoData);
  
      this.alertaService
        .confirmSave(
          '¿Registrar nuevo caso?',
          'Estás a punto de registrar un nuevo caso en el sistema. ¿Deseas continuar?'
        )
        .then((result: SweetAlertResult<any>) => {
          if (result.isConfirmed) {
            // Si el usuario confirma, proceder con el registro
            this.http
              .post('http://localhost:8080/RegistraCasos', casoData)
              .subscribe(
                (response) => {
                  this.alertaService.success(
                    'Se registró Correctamente el Caso',
                    true
                  );
                  console.log('Caso registrado con éxito:', response);
                  this.router.navigate(['/Casos-Abogados']);
                },
                (error) => {
                  console.error('Error al registrar el caso:', error);
                  this.alertaService.error(
                    'Error al registrar el caso, intenta de nuevo.'
                  );
                }
              );
          } else {
            // Si el usuario cancela, puedes manejarlo aquí si es necesario
            console.log('El usuario canceló el registro del caso.');
          }
        });
    });
  }
  

  ngOnInit(): void {
    this.setIdAbogado();
  }

  private setIdAbogado(): void {
    if (isPlatformBrowser(this.platformId)) {
      const nombreAbogado = localStorage.getItem('username');
      console.log('ID del abogado recuperado:', nombreAbogado); // Verifica si se obtiene el ID
      if (nombreAbogado) {
        this.formularioCaso.patchValue({ id_abogado: nombreAbogado });
        console.log(
          'ID del abogado asignado al formulario:',
          this.formularioCaso.get('id_abogado')?.value
        );
      }
    }
  }

  buscarCliente(): Promise<string | null> {
    return new Promise((resolve) => {
      const correo = this.formularioCaso.get('correo_cliente')?.value;
      console.log(`Buscando cliente con correo: ${correo}`);

      // Asegúrate de que el correo no esté vacío
      if (!correo) {
        this.alertaService.error('Por favor, ingresa un correo electrónico.');
        resolve(null);
        return;
      }

      // Realizar una llamada al backend para buscar el cliente por correo
      this.http
        .get(`http://localhost:8080/buscarCliente?correo=${correo}`)
        .subscribe(
          (cliente: any) => {
            if (cliente && cliente.id) {
              // Asegúrate de que el cliente tiene un id
              this.alertaService.success('Cliente encontrado con exito',true);
              console.log('Cliente encontrado:', cliente);
              // Actualizar el formulario con el ID del cliente
              this.formularioCaso.patchValue({ id_cliente: cliente.id });
              resolve(cliente.id); // Resolvemos con el ID del cliente
            } else {
              this.alertaService.error('Cliente no encontrado.'); // Mensaje si no se encuentra el cliente
              resolve(null);
            }
          },
          (error) => {
            console.error('Error al buscar el cliente', error);
            this.alertaService.error(
              'Error al buscar el cliente, intenta de nuevo.'
            ); // Mensaje de error
            resolve(null);
          }
        );
    });
  }
}

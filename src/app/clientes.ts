export class Cliente {
    id: number | null = null;  // ID del cliente, lo puede generar el servidor
    nombre: string | null = null;
    correo: string | null = null;
    contrasena: string | null = null;  // La contraseña del cliente
    edad: number | null = null;  // Edad del cliente
    telefono: string | null = null;
    direccion: string | null = null;
    created_at: string | null = null;
    updated_at: string | null = null;

    constructor() {
        this.id = null;
        this.nombre = null;
        this.correo = null;
        this.contrasena = null;
        this.edad = null;
        this.telefono = null;
        this.direccion = null;
        this.created_at = null;
        this.updated_at = null;
    }
}
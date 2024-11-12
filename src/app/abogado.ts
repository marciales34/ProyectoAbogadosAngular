export class Abogado {
    id: number | null = null;  // ID del abogado, lo puede generar el servidor
    nombre: string | null = null;
    correo: string | null = null;
    password: string | null = null;
    rol: string | null = null;
    telefono: string | null = null;
    created_at: string | null = null;
    updated_at: string | null = null;
    rama_id: number | null = null;  // ID de la rama del derecho a la que pertenece

    constructor() {
        this.id = null;
        this.nombre = null;
        this.correo = null;
        this.password = null;
        this.rol = null;
        this.telefono = null;
        this.created_at = null;
        this.updated_at = null;
        this.rama_id = null;
    }
}
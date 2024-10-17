export class Caso {
    id: number | null;  // ID del caso
    id_abogado_encargado: number | null;  // ID del abogado encargado
    id_cliente: number | null;  // ID del cliente asociado
    estado_caso: string | null;  // Estado actual del caso
    descripcion_caso: string | null;  // Descripción del caso
    evidencia: string | null;  // Evidencia relacionada con el caso
    testimonios: string | null;  // Testimonios en el caso
    creado_en: string | null;  // Fecha de creación del caso
    actualizado_en: string | null;  // Fecha de última actualización del caso
    rama_id: number | null;  // ID de la rama jurídica del caso

    constructor() {
        this.id = null; 
        this.id_abogado_encargado = null;
        this.id_cliente = null;
        this.estado_caso = null;
        this.descripcion_caso = null;
        this.evidencia = null;
        this.testimonios = null;
        this.creado_en = null;
        this.actualizado_en = null;
        this.rama_id = null;
    }
}

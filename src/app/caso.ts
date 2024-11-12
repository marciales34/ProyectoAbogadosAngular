export class Caso {
    id: null = null;  // ID del caso, el servidor lo puede generar
    id_abogado_encargado: number | null = null;
    id_cliente: number | null = null;
    estado_caso: string | null = null;
    descripcion_caso: string | null = null;
    evidencia: string | null = null;
    testimonios: string | null = null;
    creado_en: string | null = null;
    actualizado_en: string | null = null;
    rama_id: number | null = null;
  

    constructor() {
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

export interface Caso {
    id: any;  // ID del caso
    id_abogado_encargado: any;  // ID del abogado encargado
    id_cliente: any;  // ID del cliente asociado
    estado_caso: any;  // Estado actual del caso
    descripcion_caso: any;  // Descripción del caso
    evidencia: any;  // Evidencia relacionada con el caso
    testimonios: any;  // Testimonios en el caso
    creado_en: any;  // Fecha de creación del caso
    actualizado_en: any;  // Fecha de última actualización del caso
    rama_id: any;  // ID de la rama jurídica del caso
}

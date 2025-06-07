// Tipo de desafio posible
export type TipoDesafio = "foto" | "ubicacion" | "texto";

// Representa un desafío que se muestra al usuario
export interface Desafio {
  id: string;
  tipo: TipoDesafio;
  descripcion: string;
}

// Representa una respuesta a un desafío completado
export interface Registro {
  fecha: string; // YYYY-MM-DD
  desafio: Desafio;
  respuesta: string; // puede ser base64 (foto), coords o texto
}

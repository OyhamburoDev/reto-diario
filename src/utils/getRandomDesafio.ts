import desafios from "../data/desafios.json";
import { Desafio } from "../types";

//Devuelve un desafio aleatorio de la lista
export function getRandomDesafio(): Desafio {
  const index = Math.floor(Math.random() * desafios.length);
  return desafios[index] as Desafio;
}

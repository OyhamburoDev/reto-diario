import { Desafio } from "../types";

export type RootStackParamList = {
  Tabs: { screen: string };
  Inicio: undefined;
  Desafio: { desafio: Desafio };
  Camara: { descripcion: string };
  Location: { descripcion: string };
  EditarPerfil: undefined;
};

import { ref, push, set, get } from "firebase/database";
import { db } from "./firebaseConfig";

// Guardar una foto
export const savePhoto = async (base: string, descripcion: string) => {
  const photosRef = ref(db, "fotos/");
  const newPhotoRef = push(photosRef);

  await set(newPhotoRef, {
    base,
    descripcion,
    tipo: "foto",
    date: new Date().toISOString(),
  });
};

// Traer todas las fotos
export const getFotos = async () => {
  const fotosRef = ref(db, "fotos/");
  const snapshot = await get(fotosRef);

  if (!snapshot.exists()) return [];

  const data = snapshot.val();

  return Object.entries(data).map(([id, obj]: any) => ({
    id,
    descripcion: obj.descripcion,
    date: obj.date,
    tipo: obj.tipo ?? "foto",
  }));
};

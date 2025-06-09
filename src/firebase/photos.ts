import { ref, push, set, get } from "firebase/database";
import { db } from "./firebaseConfig";

// Guardar una foto
export const savePhoto = async (
  uid: string | null,
  base: string,
  descripcion: string
) => {
  const photosRef = ref(db, `fotos/${uid}`);
  const newPhotoRef = push(photosRef);

  await set(newPhotoRef, {
    base,
    descripcion,
    tipo: "foto",
    date: new Date().toISOString(),
  });
};

// Traer todas las fotos
export const getFotos = async (uid: string | null) => {
  const fotosRef = ref(db, `fotos/${uid}`);
  const snapshot = await get(fotosRef);

  if (!snapshot.exists()) return [];

  const data = snapshot.val();

  return Object.entries(data).map(([id, obj]: any) => ({
    id,
    base: obj.base,
    descripcion: obj.descripcion,
    date: obj.date,
    tipo: obj.tipo ?? "foto",
  }));
};

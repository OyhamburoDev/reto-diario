import { ref, push, set, get } from "firebase/database";
import { db } from "./firebaseConfig";

// Guardar Text
export const saveText = async (
  uid: string | null,
  text: string,
  descripcion: string
) => {
  const textRef = ref(db, `texts/${uid}`);
  const newTextRef = push(textRef);

  await set(newTextRef, {
    text,
    descripcion,
    tipo: "texto",
    date: new Date().toISOString(),
  });
};

// Traer textos
export const getText = async (uid: string | null) => {
  if (!uid) return [];

  const texRef = ref(db, `texts/${uid}`);
  const snapshot = await get(texRef);

  if (!snapshot.exists()) return [];

  const data = snapshot.val();

  return Object.entries(data).map(([id, obj]: any) => ({
    id,
    descripcion: obj.descripcion,
    date: obj.date,
    tipo: obj.tipo ?? "texto",
  }));
};

import { ref, push, set, get } from "firebase/database";
import { db } from "./firebaseConfig";

// Guardar ubicación
export const saveLocation = async (
  uid: string | null,
  address: string,
  descripcion: string
) => {
  const locationsRef = ref(db, `Locations/${uid}`);
  const newLocationRef = push(locationsRef);

  await set(newLocationRef, {
    address,
    descripcion,
    tipo: "ubicacion",
    date: new Date().toISOString(),
  });
};

// Traer ubicaciones
export const getLocations = async (uid: string | null) => {
  if (!uid) return [];

  const locRef = ref(db, `Locations/${uid}`);
  const snapshot = await get(locRef);

  if (!snapshot.exists()) return [];

  const data = snapshot.val();

  return Object.entries(data).map(([id, obj]: any) => ({
    id,
    address: obj.address,
    descripcion: obj.descripcion,
    date: obj.date,
    tipo: obj.tipo ?? "ubicacion",
  }));
};

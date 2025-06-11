import { ref, push, set, get, update } from "firebase/database";
import { db } from "./firebaseConfig";
import type { PerfilUsuario } from "../screens/EditarPerfilScreen";

export const updateUserData = async (
  uid: string | null,
  cambios: Partial<PerfilUsuario>
) => {
  if (!uid) return;
  const userDataRef = ref(db, `userData/${uid}`);
  await update(userDataRef, cambios);
};

// Traer datos del usuario
export const getUserData = async (uid: string | null) => {
  if (!uid) return;

  const dataRef = ref(db, `userData/${uid}`);
  const snapshot = await get(dataRef);

  if (!snapshot.exists()) return null;

  const data = snapshot.val();

  return {
    uid,
    base: data.base,
    name: data.name,
    biografia: data.biografia,
  };
};

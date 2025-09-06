import { openDB } from "idb";

//Introduzido para fins de estudos. As imagens não precisam ser salvas na storage, e se fossem, poderiam ser comprimidas.

export const db = await openDB("faces-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("images")) {
      db.createObjectStore("images", { keyPath: "id", autoIncrement: true });
    }
  },
});

export async function saveImage(file: File | Blob) {
  const id = await db.add("images", { file });
  return id;
}

export async function getImage(id: number) {
  const entry = await db.get("images", id);
  return entry?.file as Blob | undefined;
}

export async function deleteImage(id: number) {
  await db.delete("images", id);
}

import config from "../configs.js";
import firebase_admin from "firebase-admin";

firebase_admin.initializeApp({
  credential: firebase_admin.credential.cert(config.firebase),
});

const dbFirestore = firebase_admin.firestore();

export class ContenedorFirebase {
  constructor(nombreColeccion) {
    this.coleccion = dbFirestore.collection(nombreColeccion);
  }

  async getById(id) {
    try {
      const doc = await this.coleccion.doc(id).get();
      if (!doc.exists) {
        throw new Error(`Error al listar por id: no se encontró`);
      } else {
        const data = doc.data();
        return { ...data, id };
      }
    } catch (error) {
      throw new Error(`Error al listar por id: ${error}`);
    }
  }

  async getAll() {
    try {
      const result = [];
      const allDocs = await this.coleccion.get();
      allDocs.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      return result;
    } catch (error) {
      throw new Error(`Error al listar todo: ${error}`);
    }
  }

  async save(objToSaved) {
    try {
      const guardado = await this.coleccion.add(objToSaved);
      console.log("Producto guardado exitosamente ", guardado);
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async editById(id, objToSaved) {
    try {
      const objToUpdate = await this.coleccion.doc(id).set(objToSaved);
      console.log("Elemento editado exitosamente ", objToUpdate);
    } catch (error) {
      throw new Error(`Error al actualizar: ${error}`);
    }
  }

  async delete(id) {
    try {
      const item = await this.coleccion.doc(id).delete();
      console.log("Elemento eliminado exitosamente ", item);
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async deleteAll() {
    try {
      this.coleccion.get().then((querySnapshot) => {
        querySnapshot.docs.forEach((snapshot) => {
          snapshot.ref.delete();
        });
      });
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }
}

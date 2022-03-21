import mongoose from "mongoose";
import config from "../configs.js";
import { parseObject, renameField, removeField } from "../utils/objectUtils.js";

await mongoose
  .connect(config.mongodb.mongoDB_uri, config.mongodb.options)
  .then(() => {
    console.log("DB is connected!");
  });

export class ContenedorMongoDb {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

  async getById(id) {
    try {
      const docs = await this.coleccion.find({ _id: id }, { __v: 0 });
      if (docs.length == 0) {
        throw new Error("Error al listar por id: no encontrado");
      } else {
        const result = renameField(parseObject(docs[0]), "_id", "id");
        return result;
      }
    } catch (error) {
      throw new Error(`Error al listar por id: ${error}`);
    }
  }

  async getAll() {
    try {
      let docs = await this.coleccion.find({}, { __v: 0 }).lean();
      docs = docs.map(parseObject);
      docs = docs.map((d) => renameField(d, "_id", "id"));
      return docs;
    } catch (error) {
      throw new Error(`Error al listar todo: ${error}`);
    }
  }

  async save(obj) {
    try {
      let doc = await this.coleccion.create(obj);
      doc = parseObject(doc);
      renameField(doc, "_id", "id");
      removeField(doc, "__v");
      console.log("Objeto guardado exitosamente ", doc);
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async editById(obj) {
    try {
      renameField(obj, "id", "_id");
      const { n, nModified } = await this.coleccion.replaceOne(
        { _id: obj._id },
        obj
      );
      if (n == 0 || nModified == 0) {
        throw new Error("Error al actualizar: no encontrado");
      } else {
        renameField(obj, "_id", "id");
        removeField(obj, "__v");
        console.log("Objeto actualizado exitosamente ", parseObject(obj));
      }
    } catch (error) {
      throw new Error(`Error al actualizar: ${error}`);
    }
  }

  async delete(id) {
    try {
      const { n, nDeleted } = await this.coleccion.deleteOne({ _id: id });
      if (n == 0 || nDeleted == 0) {
        throw new Error("Error al borrar: no encontrado");
      }
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async deleteAll() {
    try {
      await this.coleccion.deleteMany({});
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }
}

export default ContenedorMongoDb;

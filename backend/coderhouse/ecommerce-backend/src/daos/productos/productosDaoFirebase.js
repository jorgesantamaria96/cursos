import { ContenedorFirebase } from "../../contenedores/contenedorFirebase.js";

export default class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("productos");
  }

  async getById(id) {
    const obj = await super.getById(id);
    return obj;
  }

  async getAll() {
    const objs = await super.getAll();
    return objs;
  }

  async save(obj) {
    await super.save(obj);
  }

  async editById(id, objToUpdate) {
    await super.editById(id, objToUpdate);
  }

  async delete(id) {
    await super.delete(id);
  }

  async deleteAll() {
    await super.deleteAll();
  }
}

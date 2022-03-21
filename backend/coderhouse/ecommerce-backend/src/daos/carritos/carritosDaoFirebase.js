import { ContenedorFirebase } from "../../contenedores/contenedorFirebase.js";

export default class CarritosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("carritos");
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

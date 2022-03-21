import { ContendorMemoria } from "../../contenedores/contenedorMemoria.js";
import configs from "../../configs.js";

export default class CarritosDaoMemoria extends ContendorMemoria {
  constructor() {
    super("Carrito", configs.mysql);
  }

  async getAll() {
    const obj = await super.getAll();
    return obj;
  }

  async getById(id) {
    const objs = await super.getById(id);
    return objs;
  }

  async save(obj) {
    await super.save(obj);
  }

  async editById(id, obj) {
    await super.editById(id, obj);
  }

  async deleteById(id) {
    await super.deleteById(id);
  }

  async deleteAll() {
    await super.deleteAll();
  }
}

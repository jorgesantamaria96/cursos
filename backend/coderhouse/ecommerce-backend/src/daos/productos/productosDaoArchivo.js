import ContenedorArchivo from "../../contenedores/contenedorArchivo.js";

export default class ProductosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("productos");
  }

  async save(obj) {
    await super.save(obj);
  }

  async getById(id) {
    const obj = await super.getById(id);
    return obj;
  }

  async getAll() {
    const objs = await super.getAll();
    return objs;
  }

  async editById() {
    await super.editById(id);
  }

  async deleteAll() {
    await super.deleteAll();
  }

  async deleteById(id) {
    await super.deleteById(id);
  }
}

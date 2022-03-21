import ContenedorArchivo from "../../contenedores/contenedorArchivo.js";

export default class CarritosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("carrito");
  }

  async save(carrito = { timestamp: Date.now(), productos: [] }) {
    await super.save(carrito);
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

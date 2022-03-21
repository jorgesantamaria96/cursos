import ContenedorMongoDb from "../../contenedores/contenedorMongoDB.js";
import ProductSchema from "../../models/ProductoSchema.js";

export default class ProductosDaoMongoDB extends ContenedorMongoDb {
  constructor() {
    super("Productos", ProductSchema);
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

  async editById(obj) {
    await super.editById(obj);
  }

  async delete(id) {
    await super.delete(id);
  }

  async deleteAll() {
    await super.deleteAll();
  }
}

import ContenedorMongoDb from "../../contenedores/contenedorMongoDB.js";
import CarritoSchema from "../../models/CarritoSchema.js";

export default class CarritosDaoMongoDB extends ContenedorMongoDb {
  constructor() {
    super("Carritos", CarritoSchema);
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

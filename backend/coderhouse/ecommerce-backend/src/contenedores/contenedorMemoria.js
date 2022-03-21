import KnexDB from "knex";

export class ContendorMemoria {
  constructor(nombreTabla, options) {
    this.nombreTabla = nombreTabla;
    const knex = KnexDB(options);

    knex.schema
      .hasTable(this.nombreTabla)
      .then((exists) => {
        if (!exists) {
          return knex.schema
            .createTable(this.nombreTabla, (table) => {
              table.increments("id").primary().unsigned();
              table.string("name", 100);
              table.string("price", 100);
              table.string("thumbnail", 100);
              table.timestamp("created_at").defaultTo(knex.fn.now());
              table.timestamp("updated_at").defaultTo(knex.fn.now());
            })
            .then(() => console.log("table was created!!"))
            .catch((err) => {
              console.log(err);
              throw err;
            });
        } else {
          console.log(`${this.nombreTabla} exists!`);
        }
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
    this.knex = knex;
  }

  async save(objToSaved) {
    try {
      this.knex(this.nombreTabla)
        .insert(objToSaved)
        .then(() => console.log("Guardado exitosamente."))
        .catch((err) => {
          console.log(err);
          throw err;
        });
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const rows = await this.knex
        .from(this.nombreTabla)
        .where("id", Number(id))
        .select("*");
      return JSON.parse(JSON.stringify(rows));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAll() {
    try {
      const rows = await this.knex.from(this.nombreTabla).select("*");

      return JSON.parse(JSON.stringify(rows));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async editById(id, product) {
    let newProduct = { ...product, updated_at: Date.now().toString() };
    try {
      await this.knex(this.nombreTabla).where({ id: id }).update(newProduct);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteById(id) {
    try {
      await this.knex(this.nombreTabla)
        .where({ id: id })
        .del()
        .then(() => {
          console.log("Producto fue borrado exitosamente");
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  deleteAll = async () => {
    try {
      await this.knex(this.nombreTabla).del();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

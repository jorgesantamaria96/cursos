import dotenv from "dotenv";
dotenv.config();

let productosDao;
let carritosDao;

console.log("DB_SELECTED: ", process.env.DB_SELECTED);
switch (process.env.DB_SELECTED) {
  case "filesystem":
    const { default: ProductosDaoArchivo } = await import(
      "./productos/productosDaoArchivo.js"
    );
    const { default: CarritosDaoArchivo } = await import(
      "./carritos/carritosDaoArchivo.js"
    );

    productosDao = new ProductosDaoArchivo();
    carritosDao = new CarritosDaoArchivo();
    break;
  case "firebase":
    const { default: ProductosDaoFirebase } = await import(
      "./productos/productosDaoFirebase.js"
    );
    const { default: CarritosDaoFirebase } = await import(
      "./carritos/carritosDaoFirebase.js"
    );

    productosDao = new ProductosDaoFirebase();
    carritosDao = new CarritosDaoFirebase();
    break;
  case "mongodb":
    const { default: ProductosDaoMongoDB } = await import(
      "./productos/productosDaoMongoDB.js"
    );
    const { default: CarritosDaoMongoDB } = await import(
      "./carritos/carritosDaoMongoDB.js"
    );

    productosDao = new ProductosDaoMongoDB();
    carritosDao = new CarritosDaoMongoDB();
    break;
  default:
    const { default: ProductosDaoMemoria } = await import(
      "./productos/productosDaoMem.js"
    );
    const { default: CarritosDaoMemoria } = await import(
      "./carritos/carritosDaoMem.js"
    );

    productosDao = new ProductosDaoMemoria();
    carritosDao = new CarritosDaoMemoria();
    break;
}

export { productosDao, carritosDao };

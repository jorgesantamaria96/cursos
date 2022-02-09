import faker from "faker";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const productFaker = async () => {
  let products = [];
  for (let i = 0; i < 5; i++) {
    products.push({
      id: i,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      thumbnail: faker.image.animals(),
    });
  }
  await fs.writeFile(
    path.join(__dirname, "../contenedor/productos.txt"),
    JSON.stringify(products, null, 2)
  );
};

import { normalize, schema } from "normalizr";
import { v4 as uuid } from "uuid";
import util from "util";

function print(object) {
  console.log(util.inspect(object, false, 12, true));
}

//Entity de Author que pone como id al mail
const authorSchema = new schema.Entity("author");

// Entity de Mensajes basado en la id de author (mail)

const messageSchema = new schema.Entity("message", {
  id: uuid(),
  author: authorSchema,
});

const chat = new schema.Entity("chat", {
  author: authorSchema,
  msg: [messageSchema],
});

export const normalizeChat = (data) => {
  const jsonData = JSON.parse(data);
  return normalize({ ...jsonData, id: "content" }, chat);
};

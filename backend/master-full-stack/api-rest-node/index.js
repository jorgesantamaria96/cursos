"use strict";

const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3999;

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/api-rest-node", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB OK.");

    // Crear el servidor
    app.listen(port, () => {
      console.log("El servidor está corriendo en http://localhost:3999");
    });
  })
  .catch((error) => {
    console.log(error);
  });

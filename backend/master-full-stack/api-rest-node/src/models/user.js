const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  image: String,
  role: String,
});

// Eliminar la password del usuario cuando se usa populate en otro modelo
UserSchema.options.toJSON = {
  transform: (doc, ret, options) => {
    delete ret.password;
    delete ret.__v;
  },
};

module.exports = mongoose.model("User", UserSchema);
// lowercase y pluralizar el nombre
// collection: users -> documents (schema)

const jwt = require("jwt-simple");
const moment = require("moment");
const secret = "clave-secreta_para-general_el-token-6782";

exports.authentication = async (req, res, next) => {
  // Comprobar si llega autorizacion
  if (!req.headers.authorization) {
    return res.status(403).send({
      message: "La petición no tiene la cabecera de Autorizacion.",
    });
  }

  // Limpiar el token y quitar comillas
  const auth = req.headers.authorization;
  const token = auth.replace(/['"]+/g, "");

  try {
    // Decodificar el token
    const payload = jwt.decode(token, secret);

    // Comporbar si el token ha expirado
    if (payload.exp <= moment().unix()) {
      return res.status(403).send({
        message: "El token ha expirado.",
      });
    }

    // Adjuntar usuario identificado a la request
    req.user = payload;
  } catch (error) {
    console.log(error);
    return res.status(403).send({
      message: "El token no es válido",
    });
  }

  // Pasar a la acción
  next();
};

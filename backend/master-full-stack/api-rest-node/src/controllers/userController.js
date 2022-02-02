const validator = require("validator");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const User = require("../models/user");
const jwt = require("../services/jwt");

const Controller = {
  probando: (req, res) => {
    res.status(200).send({
      message: "Soy el metodo probando",
    });
  },

  testeando: (req, res) => {
    res.status(200).send({
      message: "Soy el metodo testeando.",
    });
  },

  save: async (req, res) => {
    // Recoger los parámetros de la petición
    const params = req.body;

    if (params.name && params.surname && params.email && params.password) {
      // Validar los datos
      let validateName = !validator.default.isEmpty(params.name);
      let validateSurname = !validator.default.isEmpty(params.surname);
      let validateEmail =
        !validator.default.isEmpty(params.email) &&
        validator.default.isEmail(params.email);
      let validatePassword = !validator.default.isEmpty(params.password);

      // console.log(validateName, validateSurname, validateEmail, validatePassword);
      if (
        validateName &&
        validateSurname &&
        validateEmail &&
        validatePassword
      ) {
        // Crear objeto de usuario
        const newUser = new User();
        newUser.name = params.name;
        newUser.surname = params.surname;
        newUser.email = params.email.toLowerCase();
        newUser.role = "ROLE_USER";
        newUser.image = null;

        // Asignar valores al objeto
        const user_found = await User.findOne({
          email: newUser.email.toLowerCase(),
        });

        // Comprobar si el usuario no existe
        if (user_found) {
          return res.status(500).send({
            message: "El usuario ya está registrado.",
          });
        } else {
          // Si no existe, cifrar la contraseña
          const salt = await bcrypt.genSalt(4);
          newUser.password = await bcrypt.hash(params.password, salt);
          // Guardarlo
          newUser.save((err, userSaved) => {
            if (err) {
              return res.status(500).send({
                message: "Error al guardar el usuario.",
              });
            } else if (!userSaved) {
              return res.status(500).send({
                message: "El usuario no se ha guardado.",
              });
            } else {
              // Devolver respuesta
              return res.status(200).send({
                message: "El usuario no está registrado",
                newUser,
              });
            }
          });
        }
      } else {
        return res.status(400).send({
          message:
            "Validación de los datos del usuario incorrecta, intentalo de nuevo.",
        });
      }
    } else {
      return res.status(400).send({
        message: "Faltan datos para validar el usuario.",
      });
    }
  },

  login: async (req, res) => {
    // Recoger los parametros de la petición
    const params = req.body;

    if (params.email && params.password) {
      // Validar los datos
      let validateEmail =
        !validator.default.isEmpty(params.email) &&
        validator.default.isEmail(params.email);

      let validatePassword = !validator.default.isEmpty(params.password);

      if (!validateEmail || !validatePassword) {
        res.status(400).send({
          message: "Los datos son incorrectos, ingresalos bien.",
        });
      } else {
        // Buscar usuarios que coincidan con el email
        const user_found = await User.findOne({ email: params.email });

        if (!user_found) {
          res.status(404).send({
            message: "No existe el usuario, regístrate.",
          });
        } else {
          // Si lo encenta, comprobar la contraseña con bcrypt
          const resultCompare = await bcrypt.compare(
            params.password,
            user_found.password
          );

          if (!resultCompare) {
            return res.status(404).send({
              message: "La contraseña es incorrecta.",
            });
          } else {
            // Generar token de jwt y devolverlo
            if (params.getToken) {
              // En caso de que envíe unicamente el token
              return res.status(200).send({
                status: "success",
                token: jwt.createToken(user_found),
              });
            } else {
              // Limpiar el objeto
              user_found.password = undefined;

              // Si las credenciales coinciden, devolver los datos
              return res.status(200).send({
                status: "success",
                user: user_found,
              });
            }
          }
        }
      }
    } else {
      return res.status(404).send({
        message: "Faltan datos para realizar el login.",
      });
    }
  },

  update: async (req, res) => {
    // Usar middleware para comprobar el jwt
    // Recoger los datos del usuario
    const user = req.user;
    const params = req.body;

    if (params.name && params.surname && params.email) {
      // Comprobar si el email es único
      if (user.email !== params.email) {
        const userFound = await User.findOne({ email: params.email });

        if (userFound) {
          return res.status(200).send({
            message: "El email no puede ser modificado.",
          });
        }
      }

      // Validar los datos que llegan desde el body
      let validateName = !validator.default.isEmpty(params.name);
      let validateSurname = !validator.default.isEmpty(params.surname);
      let validateEmail =
        !validator.default.isEmpty(params.email) &&
        validator.default.isEmail(params.email);

      // Eliminar propiedades innecesarias
      delete params.password;

      if (validateName && validateSurname && validateEmail) {
        // Buscar y actualizar documento de la base de datos
        await User.findByIdAndUpdate(
          user.sub,
          params,
          {
            new: true,
          },
          (err, userUpdated) => {
            if (!err) {
              // Devolver respuesta
              return res.status(200).send({
                message: "Update",
                userUpdated,
              });
            } else {
              return res.status(404).send({
                message: "Error al actualizar los datos del usuario.",
              });
            }
          }
        );
      } else {
        return res.status(404).send({
          message: "Los datos ingresados no son correctos.",
        });
      }
    } else {
      return res.status(404).send({
        message: "Faltan datos para realizar el update.",
      });
    }
  },

  uploadAvatar: async (req, res) => {
    // Configurar el modulo multiparty
    console.log(req.files);
    if (!req.files) {
      return res.status(404).send({
        status: "error",
        message: "No se envió ningún archivo.",
      });
    }

    // Recoger el fichero de la petición
    const file = req.files.file0;

    // Conseguir el nombre y la extesión del archivo subido
    const file_path = file.path;
    const file_split = file_path.split("/");

    // Nombre del archivo
    const file_name = file_split[3];

    // Extensión del archivo
    let ext_split = file_name.split(".");
    const file_ext = ext_split[1];

    console.log(file_path, file_name, file_ext);

    // Comprobar extensión (sólo imagenes), si no es válida => borrar el archivo subido
    if (
      file_ext === "png" ||
      file_ext === "jpeg" ||
      file_ext === "jpg" ||
      file_ext === "gif"
    ) {
      // Sacar el id del usuario identificado
      const userId = req.user.sub;

      // Buscar el usuario y hacer el update
      await User.findOneAndUpdate(
        userId,
        { image: file_name },
        { new: true },
        (err, userUpdate) => {
          if (err || !userUpdate) {
            return res.status(404).send({
              status: "error",
              message: "Error al conseguir el usuario.",
            });
          }
          // Devolver respuesta
          return res.status(200).send({
            status: "success",
            message: "Upload user",
            userUpdate,
          });
        }
      );
    } else {
      await fs.unlink(file_path, (err) => {
        return res.status(200).send({
          status: "error",
          error: err,
          message: "La extensión del archivo no es válida.",
        });
      });
    }
  },

  avatar: (req, res) => {
    const fileName = req.params.fileName;
    const pathFile = "src/uploads/users/" + fileName;
    console.log(pathFile);

    fs.exists(pathFile, (exists) => {
      if (exists) {
        return res.sendFile(path.resolve(pathFile));
      }
      return res.status(404).send({
        status: "error",
        message: "La imagen no existe.",
      });
    });
  },

  getUsers: async (req, res) => {
    await User.find((err, users) => {
      if (err || !users) {
        return res.status(404).send({
          status: "error",
          message: "No hay usuarios que mostrar",
        });
      }

      return res.status(200).send({
        status: "success",
        users,
      });
    });
  },

  getUser: async (req, res) => {
    const userId = req.params.userId;
    await User.findById(userId).exec((err, user) => {
      if (err || !user) {
        return res.status(404).send({
          status: "error",
          message: "No existe el usuario.",
        });
      }

      return res.status(200).send({
        status: "success",
        user,
      });
    });
  },
};

module.exports = Controller;

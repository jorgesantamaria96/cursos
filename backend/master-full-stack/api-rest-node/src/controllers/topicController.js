const validator = require("validator");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const Topic = require("../models/topic");
const jwt = require("../services/jwt");

const controller = {
  test: (req, res) => {
    return res.status(200).send({
      message: "Topic",
    });
  },

  save: (req, res) => {
    // Recoger parametros por post
    const params = req.body;
    const successParams = params.title && params.content && params.lang;

    if (successParams) {
      // Validar los datos
      let validateTitle = !validator.default.isEmpty(params.title);
      let validateContent = !validator.default.isEmpty(params.content);
      let validateLang = !validator.default.isEmpty(params.lang);

      if (validateTitle && validateContent && validateLang) {
        // Crear el objeto a guardar
        const topic = new Topic();

        // Asignar valores
        topic.title = params.title;
        topic.content = params.content;
        topic.code = params.code;
        topic.lang = params.lang;
        topic.user = req.user.sub;

        // Guardar el topic
        topic.save((err, topicSaved) => {
          if (err || !topicSaved) {
            return res.status(404).send({
              status: "error",
              message: "Ocurrió un error al guardar el tema.",
            });
          } else {
            // Devolver una respuesta
            return res.status(200).send({
              status: "success",
              message: "Topic save",
              topicSaved,
            });
          }
        });
      } else {
        return res.status(404).send({
          status: "error",
          message: "Los datos no son válidos.",
        });
      }
    } else {
      return res.status(200).send({
        status: "error",
        message: "Faltan datos por enviar.",
      });
    }
  },

  getTopics: (req, res) => {
    // Cargar la librería de paginación en la clase (MODELO)

    // Recoger la página actual
    let page;
    if (
      req.params.page === null ||
      req.params.page === undefined ||
      req.params.page === false ||
      req.params.page === 0 ||
      req.params.page == "0"
    ) {
      page = 1;
    } else {
      page = parseInt(req.params.page);
    }

    // Indicar las opciones de paginación
    const options = {
      sort: { date: -1 },
      populate: "user",
      limit: 5,
      page: page,
    };

    // Hacer el find paginado
    Topic.paginate({}, options, (err, topics) => {
      // Devolver resultado (topics, total de topics, total de pages)
      if (err) {
        console.log(err);
        return res.status(500).send({
          status: "error",
          message: "Error al hacer al consulta.",
        });
      }

      if (!topics) {
        return res.status(404).send({
          status: "notfound",
          message: "No hay topics.",
        });
      }

      return res.status(200).send({
        status: "success",
        topics: topics.docs,
        totalDocs: topics.totalDocs,
        totalPages: topics.totalPages,
      });
    });
  },

  getTopicsByUser: (req, res) => {
    // Conseguir el id del usuario
    const userId = req.params.user;

    //  Hacer un find con la condición de usuario
    Topic.find({
      user: userId,
    })
      .sort([["date", "descending"]])
      .exec((err, topics) => {
        if (err) {
          console.log(err);
          return res.status(500).send({
            status: "error",
            message: "Error al hacer al consulta.",
          });
        }

        if (!topics) {
          return res.status(404).send({
            status: "error",
            message: "No hay topics.",
          });
        }

        // Devolver resultado
        return res.status(200).send({
          status: "success",
          topics,
        });
      });
  },

  getTopic: (req, res) => {
    // Sacar el id del topic de la url
    const topicId = req.params.id;

    // Hacer un find por id del topic
    Topic.findById(topicId)
      .populate("user")
      .exec((err, topic) => {
        if (err) {
          console.log(err);
          return res.status(500).send({
            status: "error",
            message: "Error al hacer al consulta.",
          });
        }

        if (!topic) {
          return res.status(404).send({
            status: "error",
            message: "No existe el topic.",
          });
        }

        // Devolver resultado
        return res.status(200).send({
          status: "success",
          topic,
        });
      });
  },

  upadte: (req, res) => {
    // Recoger el id del topic desde la url
    const topicId = req.params.id;

    // Recoger los datos que llegan desde body
    const params = req.body;

    // Validar los datos
    const successParams = params.title && params.content && params.lang;

    if (successParams) {
      // Validar los datos
      let validateTitle = !validator.default.isEmpty(params.title);
      let validateContent = !validator.default.isEmpty(params.content);
      let validateLang = !validator.default.isEmpty(params.lang);

      if (validateTitle && validateContent && validateLang) {
        // Montar un json con los datos modificables
        const updated = {
          title: params.title,
          content: params.content,
          code: params.code,
          lang: params.lang,
        };

        // Find and Updatedel topic por id y por id de usuario
        Topic.findOneAndUpdate(
          { _id: topicId, user: req.user.sub },
          updated,
          { new: true },
          (err, topicUpdated) => {
            if (err) {
              return res.status(500).send({
                status: "error",
                message: "Ocurrió un error en la petición.",
              });
            }

            if (!topicUpdated) {
              return res.status(404).send({
                status: "error",
                message: "No se ha actualizado el tema.",
              });
            }
            // Devolver una respuesta
            return res.status(200).send({
              status: "success",
              topicUpdated,
            });
          }
        );
      } else {
        return res.status(404).send({
          status: "error",
          message: "Los datos no son válidos.",
        });
      }
    } else {
      return res.status(200).send({
        status: "error",
        message: "Faltan datos por enviar.",
      });
    }
  },

  delete: (req, res) => {
    // Sacar el id del topic de la url
    const topicId = req.params.id;

    // Hacer un find and delete por topicId y por userId
    Topic.findOneAndDelete(
      { _id: topicId, user: req.user.sub },
      (err, topicDeleted) => {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Ocurrió un error en la petición.",
          });
        }
        if (!topicDeleted) {
          return res.status(404).send({
            status: "error",
            message: "No se ha borrado el tema.",
          });
        }
        // Devolver una respuesta
        return res.status(200).send({
          status: "success",
          topicDeleted,
        });
      }
    );
  },

  search: (req, res) => {
    // Sacar string a buscar de la url
    const searchString = req.params.search;

    // Find or
    Topic.find({
      $or: [
        { title: { $regex: searchString, $options: "i" } },
        { content: { $regex: searchString, $options: "i" } },
        { code: { $regex: searchString, $options: "i" } },
        { lang: { $regex: searchString, $options: "i" } },
        { "comments.content": { $regex: searchString, $options: "i" } },
      ],
    })
      .sort([["date", "descending"]])
      .exec((err, topics) => {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Ocurrió un error en la petición.",
          });
        }

        if (!topics) {
          return res.status(404).send({
            status: "error",
            message: "No se han encontrado coincidencias.",
          });
        }

        // Devolver el resultado
        return res.status(200).send({
          status: "success",
          topics,
        });
      });
  },
};

module.exports = controller;

const validator = require("validator");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const Topic = require("../models/topic");
const jwt = require("../services/jwt");

const controller = {
  add: (req, res) => {
    // Recoger el id del topic de la url
    const topicId = req.params.id;

    // Find por id del topic
    Topic.findById(topicId).exec((err, topic) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error en la petición",
        });
      }

      if (!topic) {
        return res.status(404).send({
          status: "error",
          message: "No existe el tema.",
        });
      }

      // Comprobar objeto usuario y validar datos
      if (req.body.content) {
        let validateContent = !validator.default.isEmpty(req.body.content);

        if (!validateContent) {
          return res.status(404).send({
            status: "error",
            message: "Los datos no son válidos.",
          });
        } else {
          const comment = {
            user: req.user.sub,
            content: req.body.content,
          };

          // En la propiedad comments del objeto resultante hacer un push
          topic.comments.push(comment);

          // Guardar el topic completo
          topic.save((err) => {
            if (err) {
              return res.status(404).send({
                status: "error",
                message: "Error al guardar el comentario.",
              });
            }

            // Devolver una respuesta
            return res.status(200).send({
              status: "success",
              topic,
            });
          });
        }
      } else {
        return res.status(404).send({
          status: "error",
          message: "Faltan datos.",
        });
      }
    });
  },

  update: (req, res) => {
    // Conseguir id de comentario por url
    const commentId = req.params.commentId;

    // Recoger datos y validar
    const params = req.body;

    if (params.content) {
      let validateContent = !validator.default.isEmpty(params.content);

      if (!validateContent) {
        return res.status(404).send({
          status: "error",
          message: "Los datos no son válidos.",
        });
      } else {
        // Find and update de subdocumento (comentario)
        Topic.findOneAndUpdate(
          { "comments._id": commentId },
          {
            $set: {
              "comments.$.content": params.content,
            },
          },
          { new: true },
          (err, topicUpdated) => {
            if (err) {
              return res.status(404).send({
                status: "error",
                message: "Error al actualizar el comentario.",
              });
            }

            if (!topicUpdated) {
              return res.status(404).send({
                status: "error",
                message: "No se actualizó el comentario.",
              });
            }

            // Devolver los datos
            return res.status(200).send({
              status: "success",
              topicUpdated,
            });
          }
        );
      }
    } else {
      return res.status(404).send({
        status: "error",
        message: "Faltan datos.",
      });
    }
  },

  delete: (req, res) => {
    // Sacar el id del comentario y del topic
    const topicId = req.params.topicId;
    const commentId = req.params.commentId;

    // Buscar el topic
    Topic.findById(topicId, (err, topic) => {
      if (err) {
        return res.status(404).send({
          status: "error",
          message: "Error al obtener el tema.",
        });
      }

      if (!topic) {
        return res.status(404).send({
          status: "error",
          message: "No existe el tema.",
        });
      }

      // Seleccionar el subdocumento (comentario)
      const comment = topic.comments.id(commentId);

      if (comment) {
        // Borrar el comentario
        comment.remove();

        // Guardar el topic
        topic.save((err) => {
          if (err) {
            return res.status(404).send({
              status: "error",
              message: "Error al guardar el topic.",
            });
          }

          // Devolver un resultado
          return res.status(200).send({
            status: "success",
            topic,
          });
        });
      } else {
        return res.status(404).send({
          status: "error",
          message: "No existe el comentario.",
        });
      }
    });
  },
};

module.exports = controller;

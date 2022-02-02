const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const CommentSchema = Schema({
  content: String,
  date: { type: Date, default: Date.now() },
  user: { type: Schema.ObjectId, ref: "User" },
});

const Comment = mongoose.model("Comment", CommentSchema);

// Modelo de Topic
const TopicSchema = Schema({
  title: String,
  content: String,
  code: String,
  lang: String,
  date: { type: Date, default: Date.now() },
  user: { type: Schema.ObjectId, ref: "User" },
  comments: [CommentSchema],
});

// Cargar paginación
TopicSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Topic", TopicSchema);
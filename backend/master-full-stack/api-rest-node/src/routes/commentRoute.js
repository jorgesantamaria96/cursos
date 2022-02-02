const express = require("express");
const CommentController = require("../controllers/commentController");
const MiddAuth = require("../middlewares/authenticated");

const router = express.Router();

router.post(
  "/comment/topic/:id",
  MiddAuth.authentication,
  CommentController.add
);
router.put(
  "/comment/:commentId",
  MiddAuth.authentication,
  CommentController.update
);
router.delete(
  "/comment/:topicId/:commentId",
  MiddAuth.authentication,
  CommentController.delete
);

module.exports = router;

const express = require("express");
const TopicController = require("../controllers/topicController");
const MiddAuth = require("../middlewares/authenticated");

const router = express.Router();

router.get("/test", TopicController.test);
router.post("/topic", MiddAuth.authentication, TopicController.save);
router.get("/topic/:id", TopicController.getTopic);
router.put("/topic/:id", MiddAuth.authentication, TopicController.upadte);
router.delete("/topic/:id", MiddAuth.authentication, TopicController.delete);
router.get("/topics/:page?", TopicController.getTopics);
router.get("/user-topics/:user", TopicController.getTopicsByUser);
router.get("/search/:search", TopicController.search);

module.exports = router;

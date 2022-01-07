const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middleware/auth");
const postController = require("../app/controller/PostController");

const Post = require("../app/models/post");
router.get("/", verifyToken, postController.show);
router.post("/", verifyToken, postController.create);
router.put("/:id", verifyToken, postController.update);
router.delete("/:id", verifyToken, postController.delete);

module.exports = router;

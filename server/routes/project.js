const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middleware/auth");
const projectController = require("../app/controller/ProjectController");

router.get("/", verifyToken, projectController.show);
router.get("/detail", verifyToken, projectController.getSingle);
router.post("/", verifyToken, projectController.create);
router.put("/:id", verifyToken, projectController.update);
router.delete("/:id", verifyToken, projectController.delete);

module.exports = router;

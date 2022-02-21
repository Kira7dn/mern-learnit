const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middleware/auth");
const spaceController = require("../app/controller/SpaceController");

router.get("/", verifyToken, spaceController.show);
router.post("/", verifyToken, spaceController.create);
router.put("/:id", verifyToken, spaceController.update);
router.delete("/:id", verifyToken, spaceController.delete);

module.exports = router;

const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middleware/auth");

const FriendController = require("../app/controller/FriendController");

router.post("/add", verifyToken, FriendController.add);
router.put("/:id", verifyToken, FriendController.accept);
router.delete("/:id", verifyToken, FriendController.delete);
router.get("/", verifyToken, FriendController.list);
router.get("/search", verifyToken, FriendController.search);

module.exports = router;

const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middleware/auth");
const upload = require("../app/middleware/upload");

const AuthController = require("../app/controller/AuthController");
router.put(
  "/avatar",
  verifyToken,
  upload.single("photo"),
  AuthController.avatar
);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
// router.get("/user", verifyToken, AuthController.user);
router.get("/", verifyToken, AuthController.check);
module.exports = router;

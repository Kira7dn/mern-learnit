const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middleware/auth");

const AuthController = require("../app/controller/AuthController");
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/", verifyToken, AuthController.check);
router.get("/", (req, res) => {
  return res.send("USER ROUTER");
});
module.exports = router;

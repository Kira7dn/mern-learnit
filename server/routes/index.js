const authRouter = require("./auth");
const postRouter = require("./post");
const friendRouter = require("./friend");

function route(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/posts", postRouter);
  app.use("/api/friend", friendRouter);
}
module.exports = route;

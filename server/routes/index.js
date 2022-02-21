const authRouter = require("./auth");
const postRouter = require("./post");
const friendRouter = require("./friend");
const spaceRouter = require("./space");
const projectRouter = require("./project")

function route(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/posts", postRouter);
  app.use("/api/friend", friendRouter);
  app.use("/api/spaces", spaceRouter);
  app.use("/api/projects", projectRouter);
}
module.exports = route;

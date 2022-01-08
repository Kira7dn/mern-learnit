const User = require("../models/user");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const Post = require("../models/post");

class LoginController {
  // @route GET api/posts
  // @desc get post
  // @access private
  async show(req, res) {
    try {
      const posts = await Post.find({ user: req.userId }).populate("user", [
        "username",
      ]);
      res.json({ success: true, posts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Interval server err" });
    }
  }

  // @route POST api/posts
  // @desc Create post
  // @access private
  async create(req, res) {
    const { title, description, url, status } = req.body;

    // Simple validation
    if (!title)
      return res.status(404).json({
        success: false,
        message: "Tittle is require",
      });
    try {
      const newPost = new Post({
        title,
        description,
        url: url.startsWith("https://") ? url : `https://${url}`,
        status: status || "TO LEARN",
        user: req.userId,
      });
      await newPost.save();
      res.json({ success: true, message: "Happy Learning", post: newPost });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Interval server err" });
    }
  }

  // @route PUT api/posts
  // @desc Update post
  // @access private
  async update(req, res) {
    const { title, description, url, status, user } = req.body;
    // Simple validation
    if (!title)
      return res.status(404).json({
        success: false,
        message: "Tittle is require",
      });
    try {
      let updatePost = {
        title,
        description: description || "",
        url: (url.startsWith("https://") ? url : `https://${url}`) || "",
        status: status || "TO LEARN",
        user: req.userId,
      };
      const postUpdateCondition = { _id: req.params.id, user: req.userId };
      updatePost = await Post.findOneAndUpdate(
        postUpdateCondition,
        updatePost,
        {
          new: true,
        }
      );

      // User not authorised to updatepost or post not found
      if (!updatePost)
        return res.status(401).json({
          success: false,
          message: "Post not found or user not authorised",
        });
      res.json({
        success: true,
        message: "Excellent progress!!",
        post: updatePost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Interval server err" });
    }
  }

  // @route DELETE api/posts/:id
  // @desc Delete post
  // @access private
  async delete(req, res) {
    try {
      const postDeleteCondition = { _id: req.params.id, user: req.userId };
      const deletedPost = await Post.findOneAndDelete(postDeleteCondition);
      // User not authorised to updatepost or post not found
      if (!deletedPost)
        return res.status(401).json({
          success: false,
          message: "Post not found or user not authorised",
        });
      res.json({
        success: true,
        message: "Deleted complete!!",
        post: deletedPost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Interval server err" });
    }
  }
}
module.exports = new LoginController();

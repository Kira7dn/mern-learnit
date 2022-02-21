const User = require("../models/user");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const sharp = require("sharp");
let path = require("path");
const { v4: uuidv4 } = require("uuid");

class AuthController {
  // @route GET api/auth
  // @desc check if user is logged in
  // @access public
  async check(req, res) {
    try {
      const user = await User.findById(req.userId)
        .select("-password")
        .populate("friends", ["username", "fullName", "avatar"]);
      if (!user)
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      res.json({ success: true, user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // @route POST api/auth/register
  // @desc Register user
  // @access public
  async register(req, res) {
    const { username, password } = req.body;
    // Simple validation
    if (!username || !password)
      return res.status(400).json({
        success: false,
        message: "Missing username and/or password",
      });
    try {
      // CHeck for existing user
      const user = await User.findOne({
        username,
      });

      if (user)
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      // All good
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({
        username,
        password: hashedPassword,
      });
      await newUser.save();

      // Return token
      const accessToken = jwt.sign(
        {
          userId: newUser._id,
        },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        success: true,
        message: "User created successfully",
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Interval server err",
      });
    }
  }
  // @route POST api/auth/avatar/
  // @desc Upload user avatar
  // @access private

  async avatar(req, res) {
    const filename =
      uuidv4() + "-" + Date.now() + path.extname(req.file.originalname);
    await sharp(req.file.buffer)
      .resize(300, 300)
      .toFile("./images/" + filename, function (err) {
        if (err) {
          console.error("sharp>>>", err);
        }
      });
    try {
      let updateUser = {
        avatar: filename,
      };
      const userUpdateCondition = { _id: req.userId };
      updateUser = await User.findOneAndUpdate(
        userUpdateCondition,
        updateUser,
        {
          new: true,
        }
      );
      // User not authorised to updatepost or post not found
      if (!updateUser)
        return res.status(401).json({
          success: false,
          message: "User not found or user not authorized",
        });
      res.json({
        success: true,
        message: "Excellent progress!!",
        post: updateUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Interval server err" });
    }
  }

  // @route POST api/auth/login
  // @desc Login user
  // @access public
  async login(req, res) {
    const { username, password } = req.body;
    // Simple validation
    if (!username || !password)
      return res.status(400).json({
        success: false,
        message: "Missing username and/or password",
      });
    try {
      // Check for existing Username
      const user = await User.findOne({
        username,
      }).populate("friends", ["username", "fullName", "avatar"]);
      if (!user)
        return res.status(400).json({
          success: false,
          message: "Incorrect username",
        });

      // Username found
      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid)
        return res.status(400).json({
          success: false,
          message: "Incorrect username or password",
        });

      // All good

      // Return token
      const accessToken = jwt.sign(
        {
          userId: user._id,
        },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        success: true,
        message: "User logged in successfully",
        accessToken,
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Interval server err",
      });
    }
  }
}
module.exports = new AuthController();

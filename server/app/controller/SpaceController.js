const User = require("../models/user");
const Space = require("../models/space");
const Project = require("../models/project");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

class SpaceController {
  // @route GET api/spaces
  // @desc get spaces
  // @access private
  async show(req, res) {
    try {
      const spaces = await Space.find({ user: req.userId })
        .select(["title", "description", "image", "rank", "user", "members"])
        .populate("user", ["username", "fullName"])
        .populate({
          path: "members",
          select: ["recipient", "requester"],
          populate: { path: "requester", select: ["username", "avatar"] },
        })
        .populate({
          path: "members",
          select: ["recipient", "requester"],
          populate: { path: "recipient", select: ["username", "avatar"] },
        });
      res.json({ success: true, spaces });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Interval server err" });
    }
  }

  // @route POST api/spaces
  // @desc Create space
  // @access private
  async create(req, res) {
    const { title, description, image, rank, members } = req.body;

    // Simple validation
    if (!title)
      return res.status(404).json({
        success: false,
        message: "Tittle is require",
      });
    try {
      const newSpace = new Space({
        title,
        description,
        image,
        rank: rank || 5,
        user: req.userId,
        members,
      });
      await newSpace.save();
      await newSpace.populate({
        path: "members",
        select: ["recipient", "requester"],
        populate: {
          path: "recipient requester",
          select: ["username", "avatar"],
        },
      });
      res.json({
        success: true,
        message: "Happy with your Work Space",
        space: newSpace,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Interval server err" });
    }
  }

  // @route PUT api/spaces/:id
  // @desc Update space
  // @access private
  async update(req, res) {
    const { title, description, image, rank, members } = req.body;
    // Simple validation
    if (!title)
      return res.status(404).json({
        success: false,
        message: "Tittle is require",
      });
    try {
      let updatedSpace = {
        title,
        description,
        image,
        rank: rank || 5,
        user: req.userId,
        members,
      };
      const spaceUpdateCondition = { _id: req.params.id, user: req.userId };
      updatedSpace = await Space.findOneAndUpdate(
        spaceUpdateCondition,
        updatedSpace,
        {
          new: true,
        }
      ).populate({
        path: "members",
        select: ["recipient", "requester"],
        populate: {
          path: "recipient requester",
          select: ["username", "avatar"],
        },
      });

      // User not authorised to updatedSpace or post not found
      if (!updatedSpace)
        return res.status(401).json({
          success: false,
          message: "Space not found or user not authorised",
        });
      res.json({
        success: true,
        message: "Excellent progress!!",
        space: updatedSpace,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Interval server err" });
    }
  }

  // @route DELETE api/spaces/:id
  // @desc Delete space
  // @access private
  async delete(req, res) {
    try {
      const spaceDeleteCondition = { _id: req.params.id, user: req.userId };
      const deletedSpace = await Space.findOneAndDelete(spaceDeleteCondition);
      // User not authorised to update or space not found
      if (!deletedSpace)
        return res.status(401).json({
          success: false,
          message: "Space not found or user not authorised",
        });
      res.json({
        success: true,
        message: "Deleted complete!!",
        post: deletedSpace,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Interval server err" });
    }
  }
}
module.exports = new SpaceController();

const User = require("../models/user");
const Friend = require("../models/friend");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
class FriendController {
  // @route GET api/friend
  // @desc get Friend List
  // @access private
  async list(req, res) {
    try {
      const reqFriends = await Friend.find({ requester: req.userId }).populate(
        "recipient",
        ["username"]
      );
      const resFriends = await Friend.find({ recipient: req.userId }).populate(
        "requester",
        ["username"]
      );
      res.json({ success: true, reqFriends, resFriends });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Interval server err" });
    }
  }

  // @route POST api/friend/add
  // @desc Add friend request
  // @access private

  async add(req, res) {
    const { friendName } = req.body;
    // Simple validation
    if (!friendName)
      return res.status(400).json({
        success: false,
        message: "Missing friend",
      });
    try {
      // Check for existing user of friend request
      const friendUser = await User.findOne({
        username: friendName,
      });
      if (!friendUser)
        return res.status(400).json({
          success: false,
          message: "Invalid Friend Username",
        });
      // Check for friendship request avaiable
      const addFriendCondition1 = await Friend.findOne({
        requester: req.userId,
        recipient: friendUser._id,
      });
      const addFriendCondition2 = await Friend.findOne({
        recipient: req.userId,
        requester: friendUser._id,
      });
      if (addFriendCondition1 || addFriendCondition2)
        return res.status(400).json({
          success: false,
          message: "You guy have requested before",
        });

      // All good

      const friendship = await Friend.findOneAndUpdate(
        { requester: req.userId, recipient: friendUser._id },
        { $set: { status: 0 } },
        { upsert: true, new: true }
      )
        .populate("requester", ["username"])
        .populate("recipient", ["username"]);
      const updateUserA = await User.findOneAndUpdate(
        { _id: req.userId },
        { $push: { friends: friendship._id } }
      );
      const updateUserB = await User.findOneAndUpdate(
        { _id: friendUser._id },
        { $push: { friends: friendship._id } }
      );
      res.json({
        success: true,
        message: "Add friend successfully",
        friendship: friendship,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Interval server err",
      });
    }
  }
  // @route PUT api/friend/:id
  // @desc Accept friend request
  // @access private

  async accept(req, res) {
    try {
      let updatedFriendShip = {
        status: 1,
      };
      const friendShipUpdateCondition = {
        _id: req.params.id,
        recipient: req.userId,
      };
      updatedFriendShip = await Friend.findOneAndUpdate(
        friendShipUpdateCondition,
        updatedFriendShip,
        {
          new: true,
        }
      );
      // User not authorised to updatepost or post not found
      if (!updatedFriendShip)
        return res.status(401).json({
          success: false,
          message: "Request not found or user not authorized",
        });
      res.json({
        success: true,
        message: "You guy are friends now",
        friendship: updatedFriendShip,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Interval server err",
      });
    }
  }
  // @route DELETE api/friend/:id
  // @desc Reject friend request
  // @access private

  async delete(req, res) {
    try {
      const FriendShipDeleteCondition1 = {
        _id: req.params.id,
        recipient: req.userId,
      };
      const deletedFriendShip1 = await Friend.findOneAndDelete(
        FriendShipDeleteCondition1
      );
      const FriendShipDeleteCondition2 = {
        _id: req.params.id,
        requester: req.userId,
      };
      const deletedFriendShip2 = await Friend.findOneAndDelete(
        FriendShipDeleteCondition2
      );
      // User not authorised to updatepost or post not found
      if (!deletedFriendShip1 && !deletedFriendShip2)
        return res.status(401).json({
          success: false,
          message: "Request not found or user not authorized",
        });
      res.json({
        success: true,
        message: "He/she will be said because of you",
        deletedFriendShip1: deletedFriendShip1,
        deletedFriendShip2: deletedFriendShip2,
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
module.exports = new FriendController();

const User = require("../models/user");
const Friend = require("../models/friend");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
function getFields(input, field) {
  var output = [];
  for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
  return output;
}

class FriendController {
  // @route GET api/friend
  // @desc get Friend List
  // @access private
  async list(req, res) {
    try {
      const reqFriends = await Friend.find({ requester: req.userId })
        .sort({ updatedAt: -1 })
        .select(["_id", "recipient", "status"])
        .populate("recipient", ["username", "fullName", "avatar"]);

      const resFriends = await Friend.find({ recipient: req.userId })
        .select(["_id", "requester", "status"])
        .populate("requester", ["username", "fullName", "avatar"]);
      const friends = [...reqFriends, ...resFriends];
      res.json({ success: true, friends });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Interval server err" });
    }
  }
  // @route GET api/friend/search
  // @desc Search friend
  // @access private
  async search(req, res) {
    let searchParam = "";
    const { search } = req.body;
    if (search) {
      searchParam = search;
    }
    try {
      const reqFriends = await Friend.find({ requester: req.userId }, [
        "recipient",
        "-_id",
      ]);
      const reqFriendsIds = getFields(reqFriends, "recipient");

      const resFriends = await Friend.find({ recipient: req.userId }, [
        "requester",
        "-_id",
      ]);
      const resFriendsIds = getFields(resFriends, "requester");

      const friendsIds = [...reqFriendsIds, ...resFriendsIds, req.userId];
      const users = await User.find(
        {
          $and: [
            { _id: { $nin: friendsIds } },
            {
              $or: [
                { fullName: { $regex: searchParam } },
                { username: { $regex: searchParam } },
                { phone: { $regex: searchParam } },
              ],
            },
          ],
        },
        "_id fullName username avatar phone"
      );

      res.json({ success: true, users, searchParam });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Interval server err" });
    }
  }
  // @route POST api/friend/add
  // @desc Add friend request
  // @access private

  async add(req, res) {
    const { friendId } = req.body;
    // Simple validation
    if (!friendId)
      return res.status(400).json({
        success: false,
        message: "Missing friend",
      });
    try {
      // Check for existing user of friend request
      const friendUser = await User.findById(friendId);
      if (!friendUser)
        return res.status(400).json({
          success: false,
          message: "Invalid Friend ID",
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
      if (friendUser._id == req.userId)
        return res.status(400).json({
          success: false,
          message: "You can not add friend to yourself",
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
        .select("-requester")
        .populate("recipient", ["username", "fullName", "avatar"]);
      res.json({
        success: true,
        message: "Add friend successfully",
        friendId,
        friendship,
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
        status: 0,
      };
      updatedFriendShip = await Friend.findOneAndUpdate(
        friendShipUpdateCondition,
        updatedFriendShip,
        {
          new: true,
        }
      )
        .select(["_id", "requester", "status"])
        .populate("requester", ["username", "fullName", "avatar"])
        .populate("recipient", ["username", "fullName", "avatar"]);
      let updatedUserA = {
        friends: updatedFriendShip.requester,
      };
      updatedUserA = await User.findOneAndUpdate(
        { _id: updatedFriendShip.recipient },
        { $push: updatedUserA },
        {
          new: true,
        }
      ).populate("friends", ["username", "fullName", "avatar"]);
      let updatedUserB = {
        friends: updatedFriendShip.recipient,
      };
      updatedUserB = await User.findOneAndUpdate(
        { _id: updatedFriendShip.requester },
        { $push: updatedUserB },
        {
          new: true,
        }
      ).populate("friends", ["username", "fullName", "avatar"]);
      // User not authorised to updatepost or post not found
      if (!updatedFriendShip)
        return res.status(401).json({
          success: false,
          message: "Request not found or user not authorized",
        });
      if (!updatedUserA || !updatedUserB)
        return res.status(401).json({
          success: false,
          message: "Friend could not add to friendlist",
        });
      res.json({
        success: true,
        message: "You guy are friends now",
        friendship: updatedFriendShip,
        updatedUserA,
        updatedUserB,
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
        friendshipId: req.params.id,
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

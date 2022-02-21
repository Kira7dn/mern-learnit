const User = require("../models/user");
const Project = require("../models/project");
const Space = require("../models/space");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

class ProjectController {
  // @route GET api/projects
  // @desc get projects
  // @access private
  async show(req, res) {
    try {
      const projects = await Project.find({
        $and: [
          {
            $or: [
              { space: { $elemMatch: { $eq: req.query.spaceId } } },
              { _id: req.query.projectId },
            ],
          },
          {
            $or: [
              { user: req.userId },
              { leader: { $eq: req.userId } },
              { members: { $elemMatch: { $eq: req.userId } } },
            ],
          },
        ],
      })
        .populate({
          path: "members",
          select: ["username", "avatar", , "fullName"],
        })
        .populate({
          path: "leader",
          select: ["username", "avatar", , "fullName"],
        })
        .populate({
          path: "children",
          select: [
            "title",
            "deadline",
            "description",
            "status",
            "rank",
            "leader",
            "progress",
          ],
          populate: {
            path: "leader",
            select: ["username", "avatar", , "fullName"],
          },
        });
      if (!projects.length)
        return res.json({ success: true, message: "You have no project" });
      res.json({ success: true, projects });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Interval server err" });
    }
  }
  // @route GET api/projects/detail
  // @desc get Single projects
  // @access private
  async getSingle(req, res) {
    try {
      const project = await Project.find({
        $and: [
          { _id: req.query.projectId },
          {
            $or: [
              { user: req.userId },
              { leader: { $eq: req.userId } },
              { members: { $elemMatch: { $eq: req.userId } } },
            ],
          },
        ],
      })
        .populate({
          path: "members",
          select: ["username", "avatar", , "fullName"],
        })
        .populate({
          path: "leader",
          select: ["username", "avatar", , "fullName"],
        })
        .populate({
          path: "children",
          select: [
            "title",
            "deadline",
            "description",
            "status",
            "rank",
            "leader",
            "progress",
          ],
          populate: {
            path: "leader",
            select: ["username", "avatar", , "fullName"],
          },
        });
      if (!project)
        return res.json({ success: true, message: "Project invalid" });
      res.json({ success: true, project });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Interval server err" });
    }
  }

  // @route POST api/project
  // @desc Create new project
  // @access private
  async create(req, res) {
    const {
      title,
      description,
      target,
      deadline,
      status,
      rank,
      leader,
      members,
      progress,
      parents,
      children,
      space,
    } = req.body;

    // Simple validation
    if (!title && !description)
      return res.status(404).json({
        success: false,
        message: "Tittle and Description is require",
      });
    try {
      const newProject = new Project({
        title,
        description,
        target,
        deadline,
        status: status || "to do",
        rank: rank || 5,
        leader,
        user: req.userId,
        members,
        progress,
        parents,
        children,
        space,
      });
      await newProject.save();
      await newProject.populate({
        path: "members",
        select: ["username", "avatar", , "fullName"],
      });
      await newProject.populate({
        path: "leader",
        select: ["username", "avatar", , "fullName"],
      });
      await newProject.populate({
        path: "children",
        select: [
          "title",
          "deadline",
          "description",
          "status",
          "rank",
          "leader",
          "progress",
        ],
      });
      res.json({
        success: true,
        message: "Happy with your Work Project",
        project: newProject,
        space,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Interval server err" });
    }
  }

  // @route PUT api/projects/:id
  // @desc Update space
  // @access private
  async update(req, res) {
    const {
      title,
      description,
      target,
      deadline,
      status,
      rank,
      leader,
      members,
      progress,
      parents,
      children,
      space,
    } = req.body;
    // Simple validation
    // if (!title && !description)
    //   return res.status(404).json({
    //     success: false,
    //     message: "Tittle and Description is require",
    //   });
    try {
      let updatedProject = {
        title,
        description,
        target,
        deadline,
        status: status || "to do",
        rank: rank || 5,
        leader,
        user: req.userId,
        members,
        progress,
        parents,
        children,
        space,
      };
      const projectUpdateCondition = { _id: req.params.id, user: req.userId };
      updatedProject = await Project.findOneAndUpdate(
        projectUpdateCondition,
        updatedProject,
        {
          new: true,
        }
      )
        .populate({
          path: "members",
          select: ["username", "avatar", , "fullName"],
        })
        .populate({
          path: "leader",
          select: ["username", "avatar", , "fullName"],
        })
        .populate({
          path: "children",
          select: [
            "title",
            "deadline",
            "description",
            "status",
            "rank",
            "leader",
            "progress",
          ],
          populate: {
            path: "leader",
            select: ["username", "avatar", , "fullName"],
          },
        });

      // User not authorised to updatedProject or post not found
      if (!updatedProject)
        return res.status(401).json({
          success: false,
          message: "Space not found or user not authorised",
        });
      res.json({
        success: true,
        message: "Excellent progress!!",
        project: updatedProject,
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
module.exports = new ProjectController();

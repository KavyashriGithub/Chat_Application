const groupModel = require("../models/groups");

exports.createGroup = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.user",req.user);
    const {
      groupName,
      members,
    } = req.body;
    const userId = req.user.userId;
console.log("groupname")
    const groupId = await groupModel.createGroup(
      groupName,
      userId,
      members
    );

    res.status(201).json({
      message: "Group created",
      groupId
    });

  } catch (err) {

    console.error("Error creating group:", err);

    res.status(500).json({
      message: "Failed to create group"
    });

  }
};

exports.getGroups = async (req, res) => {

  try {

    const userId = req.user.userId;

    const groups = await groupModel.getUserGroups(userId);
    res.json(groups);

  } catch (err) {

    res.status(500).json({
      message: "Failed to fetch groups"
    });

  }

};
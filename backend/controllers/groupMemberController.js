const groupMemberModel = require ("../models/groupMembers")
exports.getGroupMembers = async (req, res) => {
  try {
    const { groupId } = req.params;
console.log("groupId->",groupId);
    const members = await groupMemberModel.getGroupMembers(groupId);

    res.json(members);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Error fetching members" });

  }

};
const db = require("../config/knex");
const { v4: uuidv4 } = require("uuid");
//    ADD MEMBERS TO GROUP
exports.addMembers = async (groupId, members) => {

  const groupMembers = members.map((senderId) => ({
    id: uuidv4(),
    group_id: groupId,
    sender_id: senderId
  }));
  return await db("group_members").insert(groupMembers);
};
// GET ALL MEMBERS OF A GROUP
exports.getGroupMembers = async (groupId) => {

  return await db("group_members")
    .join("user", "group_members.user_id", "user.id")
    .where("group_members.group_id", groupId)
    .select("user.id", "user.user_name");
};
//    REMOVE MEMBER FROM GROUP
exports.removeMember = async (groupId, senderId) => {

  return await db("group_members")
    .where({
      group_id: groupId,
      sender_id: senderId
    })
    .del();
};

//    GET MEMBER COUNT
exports.getMemberCount = async (groupId) => {

  const result = await db("group_members")
    .where("group_id", groupId)
    .count("user_id as count")
    .first();

  return result.count;
};
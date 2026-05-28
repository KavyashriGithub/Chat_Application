const db = require("../config/knex");
const { v4: uuidv4 } = require("uuid");
exports.createGroup = async (groupName, createdBy, members = []) => {

  const groupId = uuidv4();

  await db("groups").insert({
    id: groupId,
    group_name: groupName,
    created_by: createdBy,
    created_at: new Date()
  });

  const groupMembers = [];

  // add selected members
  members.forEach((memberId) => {
    groupMembers.push({
      id: uuidv4(),
      group_id: groupId,
      user_id: memberId
    });
  });

  // add creator
  groupMembers.push({
    id: uuidv4(),
    group_id: groupId,
    user_id: createdBy
  });

  console.log("Members inserting:", groupMembers);

  await db("group_members").insert(groupMembers);

  return groupId;
};

exports.getUserGroups = async (userId) => {

  return db("groups")
    .join("group_members as group_members1 ", "groups.id", "group_members1.group_id")
    .join("group_members as group_members2 ", "groups.id", "group_members2.group_id")
    .where("group_members1.user_id", userId)
    .select("groups.id", "groups.group_name")
    .count("group_members2.user_id as member_count")
    .groupBy("groups.id");
};



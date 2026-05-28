const groupMessageModel = require("../models/groupMessage");

exports.getGroupMessages = async (req, res) => {

  try {

    const { groupId } = req.params;

    const messages =
      await groupMessageModel.getGroupMessages(groupId);

    return res.status(200).json(messages);

  } catch (err) {

    res.status(500).json({
      message: "Failed to fetch group messages"
    });

  }

};
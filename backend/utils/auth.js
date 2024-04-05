const Session = require("../models/session");
const User = require("../models/user");

const getUserFromRequest = async (req) => {
  const sessionId = req.cookies.sessionId;
  const session = await Session.findOne({ sessionId: sessionId });
  if (!session) {
    return null;
  }

  const user = await User.findById(session.userId);
  if (!user) {
    return null;
  }

  return user;
};

const verifyUserOwnership = (user, song) => {
  return song.owner.toString() === user._id.toString();
};

module.exports = { getUserFromRequest, verifyUserOwnership };

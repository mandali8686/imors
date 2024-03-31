const { getDownloadURL, listAll, ref } = require("firebase/storage");

exports.getSongVideos = async (req, res, next) => {
  try {
    const songId = req.params.songId;
    const sessionId = req.cookies.sessionId;
    const session = await Session.findOne({ sessionId: sessionId });
    if (!session) {
      return res.status(404).json({ message: "Session not found!" });
    }

    const user = await User.findById(session.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const videoDirectoryRef = ref(storage, `${user._id}/VideoFiles/${songId}`);
    const videoFiles = await listAll(videoDirectoryRef);

    const videoUrls = await Promise.all(
      videoFiles.items.map((itemRef) => getDownloadURL(itemRef))
    );

    return res.status(200).json({ videos: videoUrls });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Failed to retrieve videos!", error: err.message });
  }
};

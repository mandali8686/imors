const mongoose = require("mongoose")

const songSchema = mongoose.Schema({

    title: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: String, required: false },
    lyrics: { type: String, required: false }

})

module.exports = mongoose.model("User", userSchema)
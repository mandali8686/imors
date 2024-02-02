const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    
    userName : { type: String, required: true },
    // salt: { type: String, required: true},
    password : { type: Object, default: "Password1@", required: true },
    email : { type: String, required: true },
    birthday : {type: String, required: false },
    songs : {type: [String], default: [""], required: false },
    
});

module.exports = mongoose.model("User", userSchema);
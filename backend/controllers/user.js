const User = require("../models/user");
const { generateSalt, hash, compare } = require('../utils/salt.js');

// Create a new user (makes a hash for the password)
exports.createUser = async (req, res, next) => {
    let hashedPassword;
    try {
         hashedPassword = hash(req.body.password);
    } catch(err) {
        return res.status(500).json({
            message: 'Failed Password Encryption'
        })
    }

    
    try {
        const foundUser = await User.findOne({ email: req.body.email });
        if (foundUser) {
            return res.status(500).json({
                message: "User already exists.",
            });
        }
        const user = new User({
            userName: req.body.userName,
            password: hashedPassword,
            email: req.body.email,
        });

        const result = await user.save();

        // Send a single response here
        return res.status(201).json({
            message: "User added successfully",
            post: {
                ...result.toObject(),
                id: result._id,
            },
        });
    } catch (err) {
        console.log(err);

        // Send a single error response here
        return res.status(500).json({
            message: "Failed to create user!",
            error: err.message,
        });
    }
};


// Update a user by email (makes a hash if the password is new)
exports.updateUser = async (req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error(`User not found, id:${userId}`);
        }
        if (user._id.toString() != req.TokenUserId.toString()){
            console.log("comparison: " + user._id + " " + req.TokenUserId);
            throw new Error("Invalid Credentials");
        }
        // Update user properties as needed
        if (req.body.userName !== undefined) user.userName = req.body.userName;
        if (req.body.email !== undefined) user.email = req.body.email;
        if (req.body.birthday !== undefined) user.birthday = req.body.birthday;

        // Check if a new password is provided and it's different from the existing one
        if (req.body.password && req.body.password !== user.password) {
            // Check if the provided password is not already hashed
            let match = await compare(req.body.password, user.password);
            if (!match) {
                let salt = generateSalt(10);
                let hashedpassword = hash(req.body.password, salt);
                user.password = hashedpassword;
            }
        }

        await user.save();

        return res.status(200).json({
            message: "User updated successfully",
            user: user.toObject(),
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message || "Failed to update user!",
            id: userId
        });
    }
};

//get all users 
exports.getUsers = (req, res, next) => {
    User.find()
    .then((users) => {
        res.json({
            users: users.map(user => user.toObject()),
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            message: err.message || "Failed to fetch users!",
        });
    });
};

// Get a user by ID
exports.getUserById = (req, res, next) => {
    const userId = req.params.id;

    User.findById(userId)
    .then((user) => {
        if (!user) {
            throw new Error("User not found");
        }

        res.json({
            user: user.toObject(),
            id: userId
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(404).json({
            message: err.message || "User not found!",
            id: userId
        });
    });
};

// Delete a user by ID
exports.deleteUser = (req, res, next) => {
    const userId = req.params.id;
    let userSave;
    User.findById(userId)
    .then((user) => {
        if (!user) {
            throw new Error("User not found");
        }

        // Check if the user has the necessary credentials to delete the user
        if (user._id.toString() !== req.TokenUserId) {
            throw new Error("Invalid Credentials");
        }
        userSave = user;
        // If the user has the credentials, proceed with user deletion
        return User.findByIdAndRemove(userId);
    })
    .then(() => {
        res.json({
            message: "User deleted successfully",
            user: userSave
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(404).json({
            message: err.message || "User not found or invalid credentials!",
        });
    });
};


// Get a user by email (using a query parameter)
exports.getUserByEmail = (req, res, next) => {
    const email = req.params.email;
    User.findOne({ email })
    .then((user) => {
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            user: { ...user._doc },
            status: "Success"
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(404).json({
            message: err.message || "User not found!",
        });
    });
};

exports.updateUsername = async (req, res) => {
    console.log("!!!!!!!",req.body)
    const { email, username } = req.body;
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send('User not found');
      }
      user.username = username;
      await user.save();
      res.send('Username updated successfully');
    } catch (error) {
      res.status(500).send('Error updating username');
    }
  };
  

//   // Update a user by email (makes a hash if the password is new)
// exports.updateUser = async (req, res, next) => {
//     const userId = req.params.id;

//     try {
//         const user = await User.findById(userId);

//         if (!user) {
//             throw new Error(`User not found, id:${userId}`);
//         }
//         if (user._id.toString() != req.TokenUserId.toString()){
//             console.log("comparison: " + user._id + " " + req.TokenUserId);
//             throw new Error("Invalid Credentials");
//         }
//         // Update user properties as needed
//         if (req.body.userName !== undefined) user.userName = req.body.userName;
//         if (req.body.email !== undefined) user.email = req.body.email;
//         if (req.body.birthday !== undefined) user.birthday = req.body.birthday;

//         // Check if a new password is provided and it's different from the existing one
//         if (req.body.password && req.body.password !== user.password) {
//             // Check if the provided password is not already hashed
//             let match = await compare(req.body.password, user.password);
//             if (!match) {
//                 let salt = generateSalt(10);
//                 let hashedpassword = hash(req.body.password, salt);
//                 user.password = hashedpassword;
//             }
//         }

//         await user.save();

//         return res.status(200).json({
//             message: "User updated successfully",
//             user: user.toObject(),
//         });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             message: err.message || "Failed to update user!",
//             id: userId
//         });
//     }
// };
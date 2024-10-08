import User from "../models/user.model.js";

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(401).json({ message: "User not found !" })
        }
        return res.status(200).json({ user, message: "User find successfully" })
    } catch (error) {
        return res.status(401).json({ message: "Something went wrong" })
    }
}
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Find all users
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found!" });
        }
        return res.status(200).json({ users, message: "Users retrieved successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};


const updateUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        if ([username, email].some((item) => (item === " "))) {
            return res.status(401).json({ message: "all fields are required" })
        }
        const updatedUserProfile = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: username,
                email: email,
            }
        }, {
            new: true
        });
        return res
            .status(200)
            .json({ updatedUser: updatedUserProfile, message: "user updated successfully" })
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Something went wrong while updating usre" })
    }
}


const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res
            .status(200)
            .clearCookie("accessToken", { httpOnly: true, secure: true })
            .clearCookie("refreshToken", { httpOnly: true, secure: true })
            .json({ message: "user deleted successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Something went wrong while deleting user", error: error });
    }
}

const changeCurrentPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if ([oldPassword, newPassword].some((item) => (item === " "))) {
            return res.status(401).json({ message: "all fields are required" })
        }
        const user = await User.findById(req.user._id);
        const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
        if (!isPasswordCorrect) {
            return res.status(402).json({ message: "Invalid old password" })
        }
        user.password = newPassword;
        await user.save({ validateBeforeSave: true });
        return res.status(200).json({ message: "password changed successfully" })

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong while changing password", error: error });
    }
}

const logout = async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: {
            refreshToken: 1
        }
    }, {
        new: true,
    })
    return res
        .status(200)
        .clearCookie("accessToken", { httpOnly: true, secure: true })
        .clearCookie("refreshToken", { httpOnly: true, secure: true })
        .json({ message: "logout successfully" })
}

export { getUser, getAllUsers, updateUser, changeCurrentPassword, deleteUser, logout }




// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(400).json({ message: 'Error fetching users', error: err.message });
//   }
// };

// const getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(user);
//   } catch (err) {
//     res.status(400).json({ message: 'Error fetching user', error: err.message });
//   }
// };

// const updateUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(user);
//   } catch (err) {
//     res.status(400).json({ message: 'Error updating user', error: err.message });
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ message: 'User deleted' });
//   } catch (err) {
//     res.status(400).json({ message: 'Error deleting user', error: err.message });
//   }
// };

// module.exports = { getUsers, getUserById, updateUser, deleteUser };

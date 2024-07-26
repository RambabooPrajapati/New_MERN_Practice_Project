
import User from "../models/user.model.js";


const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if ([username, email, password].some((item) => (item === ""))) {
            return res.status(401).json({ message: "all fields are required" })
        }
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(402).json({ message: "you are already registered user-------" })
        }
        const user = await User.create({
            username,
            email,
            password
        })
        const createdUser = await User.findById(user._id).select("-refreshToken -password");
        if (!createdUser) {
            return res.status(402).json({ message: "Something went wrong while registering user" })
        }
        return res.status(200).json({ createdUser, message: "Registration successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Someting went while registering user", error: error.message })
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if ([email, password].some((item) => (item === " "))) {
            return res.status(401).json({ message: "all fields are required" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(402).json({ message: "you are not registered user" })
        }
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(402).json({ message: "Invalid credentials" })
        }
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: true });

        const loggedIndUser = await User.findById(user._id).select("-refreshToken -password");
        return res
            .status(200)
            .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
            .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
            .json({ loggedIndUser, message: "LoggedIn successfully", accessToken, refreshToken });
    } catch (error) {
        return res.status(500).json({ message: "Someting went wrong", error: error.message })
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(401).json({ message: "User not found !" })
        }
        return res.status(200).json({user, message: "User find successfully" })
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

const updateProfile = async (req, res) => {
    try {
        const { username, email } = req.body;
        if ([username, email].some((item) => (item === " "))) {
            return res.status(401).json({ message: "all fields are required" })
        }
        const updatedUserProfile = await User.findByIdAndUpdate(req.user._id, {
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

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        return res
        .status(200)
        .clearCookie("accessToken", {httpOnly: true, secure:true})
        .clearCookie("refreshToken", {httpOnly: true, secure:true})
        .json({ message: "user deleted successfully" });
    } catch (error) {
        return res
        .status(500)
        .json({ message: "Something went wrong while deleting user", error: error });
    }
}

export { register, login, getUserProfile, getAllUsers, logout, updateProfile, changeCurrentPassword, deleteUser }

import User from "../models/user.model.js";


const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        // if ([username, email, password].some((item) => (item === ""))) {
        //     return res.status(401).json({ message: "all fields are required" })
        // }
        if ([username, email, password].some((item) => !item.trim())) {
            return res.status(401).json({ message: "All fields are required" });
        } // for handling both empty strings and spaces
        
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(402).json({ message: "you are already registered user-------" })
        }
        const user = await User.create({
            username,
            email,
            password,
            role
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



export { register, login}
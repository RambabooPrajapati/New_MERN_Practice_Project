import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const tokenVerify = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json("You are not authenticated!");
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        if (!decoded) {
            return res.status(401).json("Invalid token!");
        }
        const user = await User.findById(decoded._id);
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json("Unauthorized");
    }
};

export default tokenVerify;

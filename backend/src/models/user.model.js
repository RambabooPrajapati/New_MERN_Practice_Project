import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    refreshToken: {
        type: String,
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
   return await jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
        }, 
        process.env.ACCESS_TOKEN_KEY,
        {
            expiresIn: "1h"
        }
    )
};
userSchema.methods.generateRefreshToken = async function () {
    return await jwt.sign(
        {
            _id: this._id
        }, 
        process.env.REFRASH_TOKEN_KEY,
        {
            expiresIn: "1d"
        }
    )
};

const User = mongoose.model("User", userSchema);
export default User;
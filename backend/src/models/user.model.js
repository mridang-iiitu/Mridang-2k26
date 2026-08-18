import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
            match: [
                /^\S+@\S+\.\S+$/,
                "Please enter a valid email address",
            ],
        },

        // Optional because Google-only accounts
        // do not have a local password.
        passwordHash: {
            type: String,
            default: null,
            select: false,
        },

        phone: {
            type: String,
            default: null,
            trim: true,
        },

        college: {
            type: String,
            default: null,
            trim: true,
        },

        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },

        profileImage: {
            type: String,
            default: null,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        refreshToken: {
            type: String,
            default: null,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (
        !this.isModified("passwordHash") ||
        !this.passwordHash
    ) {
        return next();
    }

    this.passwordHash = await bcrypt.hash(
        this.passwordHash,
        12
    );

    next();
});

userSchema.methods.isPasswordCorrect =
    async function (password) {
        if (!this.passwordHash) {
            return false;
        }

        return bcrypt.compare(
            password,
            this.passwordHash
        );
    };

userSchema.methods.generateAccessToken =
    function () {
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error(
                "ACCESS_TOKEN_SECRET is not set"
            );
        }

        return jwt.sign(
            {
                id: this._id.toString(),
                email: this.email,
                role: this.role,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:
                    process.env.ACCESS_TOKEN_EXPIRY ||
                    "15m",
            }
        );
    };

userSchema.methods.generateRefreshToken =
    function () {
        if (!process.env.REFRESH_TOKEN_SECRET) {
            throw new Error(
                "REFRESH_TOKEN_SECRET is not set"
            );
        }

        return jwt.sign(
            {
                id: this._id.toString(),
                type: "refresh",
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:
                    process.env.REFRESH_TOKEN_EXPIRY ||
                    "7d",
            }
        );
    };

export const User =
    mongoose.model("User", userSchema);
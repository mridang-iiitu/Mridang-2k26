import mongoose, { Schema } from "mongoose";

const authIdentitySchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        provider: {
            type: String,
            required: true,
            enum: ["google"],
        },

        // Google's stable `sub` identifier.
        providerAccountId: {
            type: String,
            required: true,
            trim: true,
        },

        providerEmail: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

authIdentitySchema.index(
    {
        provider: 1,
        providerAccountId: 1,
    },
    {
        unique: true,
    }
);

authIdentitySchema.index(
    {
        userId: 1,
        provider: 1,
    },
    {
        unique: true,
    }
);

export const AuthIdentity =
    mongoose.model(
        "AuthIdentity",
        authIdentitySchema
    );
import mongoose, { Schema } from "mongoose";

const teamSchema = new Schema(
    {
        event: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        leader: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        inviteCode: {
            type: String,
            unique: true,
            required: true,
        },

        isLocked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Team = mongoose.model("Team", teamSchema);
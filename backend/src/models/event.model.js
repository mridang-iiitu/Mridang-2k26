import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        venue: {
            type: String,
            required: true,
            trim: true,
        },

        banner: {
            url: {
                type: String,
                default: "",
            },
            publicId: {
                type: String,
                default: "",
            },
        },

        eventType: {
            type: String,
            enum: ["SOLO", "TEAM"],
            required: true,
        },

        minTeamSize: {
            type: Number,
            default: 1,
        },

        maxTeamSize: {
            type: Number,
            default: 1,
        },

        registrationFee: {
            type: Number,
            default: 0,
            min: 0,
        },

        registrationsCount: {
            type: Number,
            default: 0,
        },

        registrationDeadline: {
            type: Date,
            required: true,
        },

        startTime: {
            type: Date,
            required: true,
        },

        endTime: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: [
                "UPCOMING",
                "REGISTRATION_CLOSED",
                "ONGOING",
                "COMPLETED",
                "CANCELLED",
            ],
            default: "UPCOMING",
        },

        rules: [
            {
                type: String,
                trim: true,
            },
        ],

        prizes: [
            {
                position: String,
                reward: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Event = mongoose.model("Event", eventSchema);
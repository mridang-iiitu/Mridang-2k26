import mongoose, { Schema } from "mongoose";

const registrationSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        event: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },

        team: {
            type: Schema.Types.ObjectId,
            ref: "Team",
            default: null,
        },
        // it will be marked by the admin 
        // protected controller entity
        paymentStatus: {
            type: String,
            enum: ["PENDING", "PAID", "FAILED"],
            default: "PENDING",
        },

        status: {
            type: String,
            enum: ["REGISTERED", "CANCELLED"],
            default: "REGISTERED",
        },
    },
    {
        timestamps: true,
    }
);

registrationSchema.index(
    { user: 1, event: 1 },
    { unique: true }
);

export const Registration = mongoose.model(
    "Registration",
    registrationSchema
);
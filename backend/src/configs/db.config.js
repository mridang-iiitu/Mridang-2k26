import mongoose from "mongoose";

export const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error("MONGODB_URI is not set in the environment");
    }

    try {
        const connection = await mongoose.connect(mongoUri);

        console.log(
            `MongoDB connected: ${connection.connection.host}`
        );
    } catch (error) {
        console.error(
            "MongoDB connection failed:",
            error.message
        );

        throw error;
    }
};
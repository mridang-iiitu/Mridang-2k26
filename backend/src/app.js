import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";

const app =
    express();

const allowedOrigin =
    process.env.CLIENT_URL ||
    "http://localhost:5173";

app.use(
    cors({
        origin:
            allowedOrigin,
        credentials:
            true,
    })
);

app.use(
    express.json({
        limit: "1mb",
    })
);

app.use(
    cookieParser()
);

app.get(
    "/health",
    (req, res) => {
        res.status(200).json({
            success: true,
            message:
                "Backend is running",
        });
    }
);

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    (err, req, res, next) => {
        console.error(
            "Unhandled error:",
            err
        );

        if (
            res.headersSent
        ) {
            return next(err);
        }

        return res
            .status(
                err.statusCode ||
                    500
            )
            .json({
                success:
                    false,

                code:
                    "INTERNAL_SERVER_ERROR",

                message:
                    err.message ||
                    "Internal server error",
            });
    }
);

export default app;
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

const getAccessToken = (req) => {
    const authorization =
        req.headers.authorization;

    if (
        authorization?.startsWith("Bearer ")
    ) {
        return authorization
            .slice(7)
            .trim();
    }

    return (
        req.cookies?.accessToken ||
        null
    );
};

export const protect = async (
    req,
    res,
    next
) => {
    try {
        const token =
            getAccessToken(req);

        if (!token) {
            return res.status(401).json({
                code:
                    "AUTHENTICATION_REQUIRED",
                message:
                    "Authentication required",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        if (!decoded?.id) {
            return res.status(401).json({
                code:
                    "INVALID_ACCESS_TOKEN",
                message:
                    "Invalid access token",
            });
        }

        const user =
            await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                code: "USER_NOT_FOUND",
                message:
                    "User no longer exists",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        if (
            error.name ===
            "TokenExpiredError"
        ) {
            return res.status(401).json({
                code:
                    "ACCESS_TOKEN_EXPIRED",
                message:
                    "Access token expired",
            });
        }

        return res.status(401).json({
            code:
                "INVALID_ACCESS_TOKEN",
            message:
                "Invalid access token",
        });
    }
};
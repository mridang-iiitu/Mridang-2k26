import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";
import {
    clearAuthCookies,
    setAuthCookies,
} from "../utils/authCookies.util.js";

const publicUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    college: user.college,
    role: user.role,
    profileImage: user.profileImage,
    isVerified: user.isVerified,
});

export const getMe = async (
    req,
    res
) => {
    return res.status(200).json({
        success: true,
        user: publicUser(req.user),
    });
};

export const refreshSession =
    async (req, res) => {
        try {
            const refreshToken =
                req.cookies?.refreshToken;

            if (!refreshToken) {
                return res
                    .status(401)
                    .json({
                        code:
                            "REFRESH_TOKEN_REQUIRED",
                        message:
                            "Refresh token required",
                    });
            }

            const decoded =
                jwt.verify(
                    refreshToken,
                    process.env
                        .REFRESH_TOKEN_SECRET
                );

            if (
                !decoded?.id ||
                decoded.type !==
                    "refresh"
            ) {
                return res
                    .status(401)
                    .json({
                        code:
                            "INVALID_REFRESH_TOKEN",
                        message:
                            "Invalid refresh token",
                    });
            }

            const user =
                await User.findById(
                    decoded.id
                ).select(
                    "+refreshToken"
                );

            if (
                !user ||
                !user.refreshToken ||
                user.refreshToken !==
                    refreshToken
            ) {
                return res
                    .status(401)
                    .json({
                        code:
                            "INVALID_REFRESH_TOKEN",
                        message:
                            "Refresh token is no longer valid",
                    });
            }

            const accessToken =
                user.generateAccessToken();

            const newRefreshToken =
                user.generateRefreshToken();

            user.refreshToken =
                newRefreshToken;

            await user.save({
                validateBeforeSave:
                    false,
            });

            setAuthCookies(
                res,
                accessToken,
                newRefreshToken
            );

            return res
                .status(200)
                .json({
                    success: true,
                    message:
                        "Session refreshed",
                });
        } catch (error) {
            if (
                error.name ===
                    "TokenExpiredError" ||
                error.name ===
                    "JsonWebTokenError"
            ) {
                return res
                    .status(401)
                    .json({
                        code:
                            "INVALID_REFRESH_TOKEN",
                        message:
                            "Refresh token is invalid or expired",
                    });
            }

            console.error(
                "Refresh token error:",
                error
            );

            return res
                .status(500)
                .json({
                    code:
                        "REFRESH_FAILED",
                    message:
                        "Could not refresh session",
                });
        }
    };

export const logout =
    async (req, res) => {
        try {
            const refreshToken =
                req.cookies?.refreshToken;

            if (refreshToken) {
                const user =
                    await User.findOne({
                        refreshToken,
                    }).select(
                        "+refreshToken"
                    );

                if (user) {
                    user.refreshToken =
                        null;

                    await user.save({
                        validateBeforeSave:
                            false,
                    });
                }
            }

            clearAuthCookies(res);

            return res
                .status(200)
                .json({
                    success: true,
                    message:
                        "Logged out successfully",
                });
        } catch (error) {
            console.error(
                "Logout error:",
                error
            );

            clearAuthCookies(res);

            return res
                .status(500)
                .json({
                    code:
                        "LOGOUT_FAILED",
                    message:
                        "Could not complete logout",
                });
        }
    };
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {
    googleClient,
    GOOGLE_CLIENT_ID,
} from "../configs/google.config.js";
import { User } from "../models/User.model.js";
import {
    AuthIdentity,
} from "../models/AuthIdentity.model.js";
import {
    normalizeEmail,
} from "../utils/normalizeEmail.util.js";
import {
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

const issueSession = async (
    res,
    user
) => {
    const accessToken =
        user.generateAccessToken();

    const refreshToken =
        user.generateRefreshToken();

    user.refreshToken =
        refreshToken;

    await user.save({
        validateBeforeSave: false,
    });

    setAuthCookies(
        res,
        accessToken,
        refreshToken
    );
};

export const loginWithGoogle =
    async (req, res) => {
        try {
            const {
                credential,
            } = req.body;

            if (
                !credential ||
                typeof credential !==
                    "string"
            ) {
                return res
                    .status(400)
                    .json({
                        code:
                            "GOOGLE_CREDENTIAL_REQUIRED",
                        message:
                            "Google credential is required",
                    });
            }

            const ticket =
                await googleClient.verifyIdToken(
                    {
                        idToken:
                            credential,
                        audience:
                            GOOGLE_CLIENT_ID,
                    }
                );

            const payload =
                ticket.getPayload();

            if (!payload) {
                return res
                    .status(401)
                    .json({
                        code:
                            "INVALID_GOOGLE_CREDENTIAL",
                        message:
                            "Invalid Google credential",
                    });
            }

            const {
                sub,
                email,
                email_verified:
                    emailVerified,
                name,
                picture,
                iss,
            } = payload;

            if (
                iss !==
                    "https://accounts.google.com" &&
                iss !==
                    "accounts.google.com"
            ) {
                return res
                    .status(401)
                    .json({
                        code:
                            "INVALID_GOOGLE_ISSUER",
                        message:
                            "Invalid Google issuer",
                    });
            }

            if (
                !sub ||
                !email ||
                !emailVerified
            ) {
                return res
                    .status(401)
                    .json({
                        code:
                            "INVALID_GOOGLE_ACCOUNT",
                        message:
                            "Google account information is incomplete or unverified",
                    });
            }

            const normalizedEmail =
                normalizeEmail(email);

            /*
             * CASE 1
             *
             * Google account already linked.
             */
            const existingIdentity =
                await AuthIdentity.findOne(
                    {
                        provider:
                            "google",
                        providerAccountId:
                            sub,
                    }
                );

            if (existingIdentity) {
                const user =
                    await User.findById(
                        existingIdentity.userId
                    );

                if (!user) {
                    return res
                        .status(500)
                        .json({
                            code:
                                "ORPHANED_AUTH_IDENTITY",
                            message:
                                "Authentication identity is not linked to a user",
                        });
                }

                if (
                    user.email !==
                    normalizedEmail
                ) {
                    existingIdentity.providerEmail =
                        normalizedEmail;

                    await existingIdentity.save();
                }

                if (
                    !user.profileImage &&
                    picture
                ) {
                    user.profileImage =
                        picture;
                }

                user.isVerified =
                    true;

                await issueSession(
                    res,
                    user
                );

                return res
                    .status(200)
                    .json({
                        success: true,
                        message:
                            "Google login successful",
                        user:
                            publicUser(
                                user
                            ),
                    });
            }

            /*
             * CASE 2
             *
             * No Google identity.
             *
             * Search for the canonical User
             * using normalized email.
             */
            let user =
                await User.findOne({
                    email:
                        normalizedEmail,
                });

            let createdNewUser =
                false;

            /*
             * CASE 3
             *
             * No User exists.
             *
             * Atomic upsert prevents concurrent
             * Google requests from creating
             * duplicate Users.
             */
            if (!user) {
                user =
                    await User.findOneAndUpdate(
                        {
                            email:
                                normalizedEmail,
                        },
                        {
                            $setOnInsert:
                                {
                                    name:
                                        name?.trim() ||
                                        "Google User",

                                    email:
                                        normalizedEmail,

                                    profileImage:
                                        picture ||
                                        null,

                                    passwordHash:
                                        null,

                                    phone:
                                        null,

                                    college:
                                        null,

                                    role:
                                        "USER",

                                    isVerified:
                                        true,
                                },
                        },
                        {
                            upsert:
                                true,

                            new: true,

                            setDefaultsOnInsert:
                                true,
                        }
                    );

                createdNewUser =
                    true;
            }

            /*
             * An existing unverified local
             * account must not be silently linked.
             */
            if (
                !createdNewUser &&
                !user.isVerified
            ) {
                return res
                    .status(409)
                    .json({
                        code:
                            "EMAIL_VERIFICATION_REQUIRED",

                        message:
                            "An account already exists for this email. Verify it before linking Google.",
                    });
            }

            if (
                !user.profileImage &&
                picture
            ) {
                user.profileImage =
                    picture;
            }

            user.isVerified =
                true;

            await user.save();

            /*
             * Create the Google identity.
             */
            try {
                await AuthIdentity.create({
                    userId:
                        user._id,

                    provider:
                        "google",

                    providerAccountId:
                        sub,

                    providerEmail:
                        normalizedEmail,
                });
            } catch (error) {
                /*
                 * Two simultaneous requests can
                 * race to create this identity.
                 */
                if (error?.code !== 11000) {
                    if (
                        createdNewUser
                    ) {
                        await User.deleteOne(
                            {
                                _id:
                                    user._id,

                                email:
                                    normalizedEmail,
                            }
                        );
                    }

                    throw error;
                }
            }

            /*
             * Re-read it so a duplicate-key race
             * can still finish as a successful login.
             */
            const linkedIdentity =
                await AuthIdentity.findOne(
                    {
                        provider:
                            "google",

                        providerAccountId:
                            sub,
                    }
                );

            if (!linkedIdentity) {
                if (
                    createdNewUser
                ) {
                    await User.deleteOne(
                        {
                            _id:
                                user._id,

                            email:
                                normalizedEmail,
                        }
                    );
                }

                return res
                    .status(500)
                    .json({
                        code:
                            "GOOGLE_IDENTITY_LINK_FAILED",
                        message:
                            "Could not link Google authentication",
                    });
            }

            /*
             * Never silently attach a Google identity
             * to a different User.
             */
            if (
                linkedIdentity.userId.toString() !==
                user._id.toString()
            ) {
                return res
                    .status(409)
                    .json({
                        code:
                            "GOOGLE_IDENTITY_ALREADY_IN_USE",
                        message:
                            "This Google account is already linked to another account",
                    });
            }

            await issueSession(
                res,
                user
            );

            return res
                .status(
                    createdNewUser
                        ? 201
                        : 200
                )
                .json({
                    success: true,

                    message:
                        createdNewUser
                            ? "Google signup successful"
                            : "Google account linked successfully",

                    user:
                        publicUser(
                            user
                        ),
                });
        } catch (error) {
            if (
                error instanceof
                jwt.JsonWebTokenError
            ) {
                return res
                    .status(401)
                    .json({
                        code:
                            "INVALID_GOOGLE_CREDENTIAL",
                        message:
                            "Invalid Google credential",
                    });
            }

            if (
                error instanceof
                mongoose.Error.ValidationError
            ) {
                return res
                    .status(400)
                    .json({
                        code:
                            "USER_VALIDATION_FAILED",
                        message:
                            error.message,
                    });
            }

            console.error(
                "Google authentication error:",
                error
            );

            return res
                .status(500)
                .json({
                    code:
                        "GOOGLE_AUTH_FAILED",
                    message:
                        "Google authentication failed",
                });
        }
    };
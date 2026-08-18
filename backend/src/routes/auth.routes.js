import { Router } from "express";

import {
    loginWithGoogle,
} from "../controllers/GoogleAuth.controller.js";

import {
    getMe,
    refreshSession,
    logout,
} from "../controllers/session.controller.js";

import {
    protect,
} from "../middlewares/auth.middleware.js";

const router =
    Router();

router.post(
    "/google",
    loginWithGoogle
);

router.post(
    "/refresh",
    refreshSession
);

router.post(
    "/logout",
    logout
);

router.get(
    "/me",
    protect,
    getMe
);

export default router;
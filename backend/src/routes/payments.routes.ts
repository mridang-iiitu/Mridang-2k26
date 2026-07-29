import { Router } from "express";
import { initiatePayment, confirmPayment } from "../controllers/payments.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.use(requireAuth);
router.post("/:registrationId/initiate", initiatePayment);
router.post("/:registrationId/confirm", confirmPayment);

export default router;

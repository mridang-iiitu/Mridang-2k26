import { Router } from "express";
import { createRegistration, myRegistrations, cancelRegistration, getTicket } from "../controllers/registrations.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.use(requireAuth);
router.post("/", createRegistration);
router.get("/me", myRegistrations);
router.post("/:id/cancel", cancelRegistration);
router.get("/:id/ticket", getTicket);

export default router;

import { Router } from "express";
import { listEvents, getEvent, createEvent, updateEvent, deleteEvent } from "../controllers/events.controller";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", listEvents);
router.get("/:slug", getEvent);
router.post("/", requireAuth, requireAdmin, createEvent);
router.patch("/:id", requireAuth, requireAdmin, updateEvent);
router.delete("/:id", requireAuth, requireAdmin, deleteEvent);

export default router;

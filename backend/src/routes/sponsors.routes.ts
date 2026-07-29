import { Router } from "express";
import { listSponsors, createSponsor, deleteSponsor } from "../controllers/sponsors.controller";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", listSponsors);
router.post("/", requireAuth, requireAdmin, createSponsor);
router.delete("/:id", requireAuth, requireAdmin, deleteSponsor);

export default router;

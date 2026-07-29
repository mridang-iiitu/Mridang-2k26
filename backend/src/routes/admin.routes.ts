import { Router } from "express";
import { dashboardStats, listUsers, listRegistrations, exportRegistrationsCsv } from "../controllers/admin.controller";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.use(requireAuth, requireAdmin);
router.get("/stats", dashboardStats);
router.get("/users", listUsers);
router.get("/registrations", listRegistrations);
router.get("/registrations/export", exportRegistrationsCsv);

export default router;

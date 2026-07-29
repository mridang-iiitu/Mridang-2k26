import { Router } from "express";
import { listImages, addImage, deleteImage } from "../controllers/gallery.controller";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", listImages);
router.post("/", requireAuth, requireAdmin, addImage);
router.delete("/:id", requireAuth, requireAdmin, deleteImage);

export default router;

import { Router } from "express";
import { getDashboardStatsController } from "../controllers/admin.dashboard.controller.js";

const router = Router();

router.get("/stats", getDashboardStatsController);

export default router;

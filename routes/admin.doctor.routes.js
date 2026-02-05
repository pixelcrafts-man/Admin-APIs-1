import { Router } from "express";
import {
  getAllDoctorsController,
  suspendDoctorController,
  verifyDoctorController,
} from "../controllers/admin.doctor.controller.js";

const router = Router();

// GET /admin/doctors
router.get("/", getAllDoctorsController);

// PATCH /admin/doctors/:id/suspend
router.patch("/:id/suspend", suspendDoctorController);

// PATCH /admin/doctors/:id/verify
router.patch("/:id/verify", verifyDoctorController);

export default router;

import { Router } from "express";
import {
  getAllClinicsController,
  approveClinicController,
} from "../controllers/admin.clinic.controller.js";

const router = Router();

router.get("/", getAllClinicsController);
router.patch("/:id/approve", approveClinicController);

export default router;

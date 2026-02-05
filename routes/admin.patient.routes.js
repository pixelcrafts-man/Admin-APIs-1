import { Router } from "express";
import {
  getAllPatientsController,
  suspendPatientController,
  activatePatientController,
} from "../controllers/admin.patient.controller.js";

const router = Router();

router.get("/", getAllPatientsController);
router.patch("/:id/suspend", suspendPatientController);
router.patch("/:id/activate", activatePatientController);

export default router;

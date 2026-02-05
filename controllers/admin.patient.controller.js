import {
  getAllPatientsService,
  suspendPatientService,
  activatePatientService,
} from "../services/admin.patient.service.js";

export const getAllPatientsController = async (req, res, next) => {
  try {
    const data = await getAllPatientsService();
    res.status(200).json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

export const suspendPatientController = async (req, res, next) => {
  try {
    const data = await suspendPatientService(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Patient not found" });
    res.status(200).json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

export const activatePatientController = async (req, res, next) => {
  try {
    const data = await activatePatientService(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Patient not found" });
    res.status(200).json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

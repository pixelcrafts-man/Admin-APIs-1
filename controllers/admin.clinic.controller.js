import {
  getAllClinicsService,
  approveClinicService,
} from "../services/admin.clinic.service.js";

export const getAllClinicsController = async (req, res, next) => {
  try {
    const data = await getAllClinicsService();
    res.status(200).json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

export const approveClinicController = async (req, res, next) => {
  try {
    const data = await approveClinicService(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Clinic not found" });
    res.status(200).json({ success: true, data });
  } catch (e) {
    next(e);
  }
};


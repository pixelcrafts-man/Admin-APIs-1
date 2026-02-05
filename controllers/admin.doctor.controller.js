import {
  getAllDoctorsService,
  suspendDoctorService,
  verifyDoctorService,
} from "../services/admin.doctor.service.js";

export const getAllDoctorsController = async (req, res, next) => {
  try {
    console.log("📥 [ADMIN][DOCTORS] Fetching all doctors");

    const doctors = await getAllDoctorsService();

    return res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      data: doctors,
    });
  } catch (error) {
    console.error("❌ [ADMIN][DOCTORS] Error fetching doctors:", error);
    next(error);
  }
};

export const suspendDoctorController = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`⚠️ [ADMIN][DOCTORS] Suspend request for doctor id=${id}`);

    const updatedDoctor = await suspendDoctorService(id);

    if (!updatedDoctor) {
      console.warn(`⚠️ [ADMIN][DOCTORS] Doctor not found for suspend id=${id}`);
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor suspended successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    console.error("❌ [ADMIN][DOCTORS] Error suspending doctor:", error);
    next(error);
  }
};

export const verifyDoctorController = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`✅ [ADMIN][DOCTORS] Verify request for doctor id=${id}`);

    const updatedDoctor = await verifyDoctorService(id);

    if (!updatedDoctor) {
      console.warn(`⚠️ [ADMIN][DOCTORS] Doctor not found for verify id=${id}`);
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor verified successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    console.error("❌ [ADMIN][DOCTORS] Error verifying doctor:", error);
    next(error);
  }
};

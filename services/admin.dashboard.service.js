import { pool } from "../config/database.js";

export const getDashboardStatsService = async () => {
  const doctors = await pool.query("SELECT COUNT(*) FROM doctors");
  const patients = await pool.query("SELECT COUNT(*) FROM patients");
  const clinics = await pool.query("SELECT COUNT(*) FROM clinics");

  return {
    totalDoctors: Number(doctors.rows[0].count),
    totalPatients: Number(patients.rows[0].count),
    totalClinics: Number(clinics.rows[0].count),
  };
};

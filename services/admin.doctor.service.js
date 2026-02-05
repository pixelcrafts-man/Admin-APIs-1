import { pool } from "../config/database.js";

export const getAllDoctorsService = async () => {
  try {
    console.log("🔎 [DB][DOCTORS] Querying all doctors");

    const result = await pool.query(`
      SELECT 
        d.id,
        d.full_name,
        d.email,
        d.speciality,
        d.status,
        d.is_verified,
        d.created_at,
        COUNT(dc.clinic_id) AS clinics_count
      FROM doctors d
      LEFT JOIN doctor_clinics dc ON d.id = dc.doctor_id
      GROUP BY d.id
      ORDER BY d.created_at DESC
    `);

    console.log(`🟢 [DB][DOCTORS] ${result.rowCount} doctors fetched`);
    return result.rows;
  } catch (error) {
    console.error("🔴 [DB][DOCTORS] Error querying doctors:", error);
    throw error;
  }
};

export const suspendDoctorService = async (doctorId) => {
  try {
    console.log(`⚙️ [DB][DOCTORS] Suspending doctor id=${doctorId}`);

    const result = await pool.query(
      `
      UPDATE doctors
      SET status = 'SUSPENDED'
      WHERE id = $1
      RETURNING id, full_name, email, status, is_verified
      `,
      [doctorId]
    );

    if (result.rowCount === 0) {
      console.warn(`⚠️ [DB][DOCTORS] No doctor found with id=${doctorId}`);
      return null;
    }

    console.log(`🟢 [DB][DOCTORS] Doctor id=${doctorId} suspended`);
    return result.rows[0];
  } catch (error) {
    console.error("🔴 [DB][DOCTORS] Error suspending doctor:", error);
    throw error;
  }
};

export const verifyDoctorService = async (doctorId) => {
  try {
    console.log(`⚙️ [DB][DOCTORS] Verifying doctor id=${doctorId}`);

    const result = await pool.query(
      `
      UPDATE doctors
      SET is_verified = true
      WHERE id = $1
      RETURNING id, full_name, email, status, is_verified
      `,
      [doctorId]
    );

    if (result.rowCount === 0) {
      console.warn(`⚠️ [DB][DOCTORS] No doctor found with id=${doctorId}`);
      return null;
    }

    console.log(`🟢 [DB][DOCTORS] Doctor id=${doctorId} verified`);
    return result.rows[0];
  } catch (error) {
    console.error("🔴 [DB][DOCTORS] Error verifying doctor:", error);
    throw error;
  }
};

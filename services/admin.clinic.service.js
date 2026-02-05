import { pool } from "../config/database.js";

export const getAllClinicsService = async () => {
  const { rows } = await pool.query("SELECT * FROM clinics ORDER BY id DESC");
  return rows;
};


export const approveClinicService = async (id) => {
  const { rows, rowCount } = await pool.query(
    "UPDATE clinics SET status='ACTIVE' WHERE id=$1 RETURNING *",
    [id]
  );
  return rowCount ? rows[0] : null;
};

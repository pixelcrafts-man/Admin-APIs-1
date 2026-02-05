import { pool } from "../config/database.js";

export const getAllPatientsService = async () => {
  const { rows } = await pool.query("SELECT * FROM patients ORDER BY created_at DESC");
  return rows;
};

export const suspendPatientService = async (id) => {
  const { rows, rowCount } = await pool.query(
    "UPDATE patients SET status='SUSPENDED' WHERE id=$1 RETURNING *",
    [id]
  );
  return rowCount ? rows[0] : null;
};

export const activatePatientService = async (id) => {
  const { rows, rowCount } = await pool.query(
    "UPDATE patients SET status='ACTIVE' WHERE id=$1 RETURNING *",
    [id]
  );
  return rowCount ? rows[0] : null;
};

const pool = require('../config/db')

const entry = async (ticket_id) => {
  try{
      const result = await pool.query(
      `UPDATE tickets
       SET is_valid = FALSE
       WHERE id = $1 AND is_valid = TRUE
       RETURNING *`,
      [ticket_id]
    );

    if (result.rows.length === 0) {
      return { error: "Invalid ticket" };
    }

    return { success: true, ticket: result.rows[0] };
  }catch (err) {
    console.error(err);
  }
}

const logScan = async (ticket_id, user_id, scan_type) => {
  await pool.query(
    `INSERT INTO scans (ticket_id, user_id, scan_type) VALUES ($1, $2, $3)`,
    [ticket_id, user_id, scan_type]
  );
};

const exitScan = async (ticket_id, scan_type) => {
  await pool.query(
  `UPDATE scans
  SET scan_type = $2
  WHERE id = $1;
  `,
    [ticket_id, scan_type]
  );
};


module.exports = {
entry,
logScan,
exitScan
}
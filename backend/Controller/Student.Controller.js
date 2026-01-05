import pool from "../utils/db.js";

const RegisterStudent = async (req, res) => {

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ success: false, message: "Request body is empty" });
  }

  const {
    first_name,
    last_name,
    gender,
    dob,
    mobile,
    address,
    admission_date,
    status,
    class_id,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !gender ||
    !dob ||
    !mobile ||
    !address ||
    !admission_date ||
    !status ||
    !class_id
  ) {
    return res.status(400).json({ success: false, message: "Some required details are missing" });
  }
  try {
    const Student = await pool.query(
      "INSERT INTO students (first_name,last_name,gender,dob,email,mobile,address,admission_date,status,class_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
      [
        first_name,
        last_name,
        gender,
        dob,
        email,
        mobile,
        address,
        admission_date,
        status,
        class_id,
      ]
    );

    if (!Student || !Student.rows || Student.rows.length === 0) {
      return res.status(500).json({ success: false, message: "Failed to create student" });
    }

    return res.status(201).json({ success: true, data: Student.rows[0] });
  } catch (err) {
    console.error("RegisterStudent error:", err?.message || err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export { RegisterStudent };

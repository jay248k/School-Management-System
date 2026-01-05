import jwt from "jsonwebtoken";
import pool from "../utils/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const RegisterStudent = async (req, res) => {
  // Protect against undefined req.body
  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Request body is empty" });
  }

  const {
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
    password,
  } = req.body;
  // Basic validation for required fields
  if (
    !first_name ||
    !last_name ||
    !gender ||
    !dob ||
    !mobile ||
    !address ||
    !admission_date ||
    !status ||
    !class_id ||
    !password
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Some required details are missing" });
  }
  try {
    const selt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(password, selt);
    const Student = await pool.query(
      "INSERT INTO students (first_name,last_name,gender,dob,mobile,address,admission_date,status,class_id,password) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
      [
        first_name,
        last_name,
        gender,
        dob,
        mobile,
        address,
        admission_date,
        status,
        class_id,
        secPassword,
      ]
    );
    const sDetails = Student.rows[0];
    console.log(sDetails.student_id);
    // Check result
    if (!Student || !Student.rows || Student.rows.length === 0) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to create student" });
    }
    const token = await jwt.sign(
      {
        student_id: sDetails.student_id,
        role: "student",
        class_id: sDetails.class_id,
      },
      process.env.SEC
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({ success: true, message: "Student created!" });
  } catch (err) {
    console.error("RegisterStudent error:", err?.message || err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const StudLogin = async (req, res) => {
  const { student_id, password } = req.body;
  if (!student_id || !password) {
    return res.json({
      success: false,
      message: "Somthing details are missing",
    });
  }
  try {
    const Student = await pool.query(
      "SELECT * FROM students where student_id=$1",
      [student_id]
    );
    if (!Student.rowCount === 0) {
      res
        .status(401)
        .json({ success: false, message: "Invalid sid or password" });
    }
    const Details = Student.rows[0];
    const isMatch = await bcrypt.compare(password, Details.password);
    if (!isMatch) {
      res
        .status(401)
        .json({ success: false, message: "Invalid sid or password" });
    }
    const token = await jwt.sign(
      {
        student_id: Details.student_id,
        role: "student",
        class_id: Details.class_id,
      },
      process.env.SEC
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ success: true, message: "Login Success", role: "student" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export { RegisterStudent, StudLogin };

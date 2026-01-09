import jwt from "jsonwebtoken";
import pool from "../utils/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const getSection = (first_name) => {
  const firstChar = first_name.trim().charAt(0).toUpperCase();

  if ("ABCDEF".includes(firstChar)) return "A";
  if ("GHIJKL".includes(firstChar)) return "B";
  if ("MNOPQR".includes(firstChar)) return "C";
  if ("STUVWXYZ".includes(firstChar)) return "D";

  return "D"; // default fallback
};

const RegisterStudent = async (req, res) => {
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
    father_name,
    mobile,
    address,
    admission_date,
    status,
    class_number,
    password,
  } = req.body;
  if (
    !first_name ||
    !last_name ||
    !gender ||
    !father_name ||
    !dob ||
    !mobile ||
    !address ||
    !admission_date ||
    !status ||
    !class_number ||
    !password
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required student details" });
  }
  try {
    const section = getSection(first_name);

    const classResult = await pool.query(
      "SELECT class_id FROM classes WHERE class_name = $1 AND section=$2",
      [class_number,section]
    );

    if (classResult.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found or section" });
    }

    const class_id = classResult.rows[0].class_id;

    const selt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(password, selt);
    const Student = await pool.query(
      "INSERT INTO students (first_name,last_name,father_name,gender,dob,mobile,address,admission_date,status,class_id,password,section) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",
      [
        first_name,
        last_name,
        father_name,
        gender,
        dob,
        mobile,
        address,
        admission_date,
        status,
        class_id,
        secPassword,
        section
      ]
    );
    if (!Student || !Student.rows || Student.rows.length === 0) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to create student" });
    }
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
    const token = jwt.sign(
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
const UpdateStudent = async (req, res) => {
  const { first_name,
    last_name,
    gender,
    dob,
    mobile,
    address,
    admission_date,
    status,
    class_id } = req.body;
  const { id } = req.params;
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
    return res
      .status(400)
      .json({ success: false, message: "Some required details are missing" });
  }
  try {
    const Update = await pool.query("UPDATE students SET first_name=$1,last_name=$2,gender=$3,dob=$4,mobile=$5,address=$6,admission_date=$7,status=$8,class_id=$9 WHERE student_id=$10", [
      first_name,
      last_name,
      gender,
      dob,
      mobile,
      address,
      admission_date,
      status,
      class_id,
      id
    ])
    if (Update.rowCount === 0) {
      return res.status(401).json({ success: false, message: "Update error" })
    }
    res.status(200).json({ success: true, message: "updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" })
  }

}
const DeleteStudent = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(401).json({ success: false, message: "Id must required" })
  }
  try {
    const Delete = await pool.query("DELETE FROM students WHERE student_id=$1", [id])
    if (Delete.rowCount === 0) {
      res.status(401).json({ success: false, message: "can't delete" })
    }
    res.status(200).json({ success: true, message: "Student Deleted" })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" })
  }

}
export { RegisterStudent, StudLogin, UpdateStudent, DeleteStudent };

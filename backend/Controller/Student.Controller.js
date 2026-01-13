import jwt from "jsonwebtoken";
import pool from "../utils/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const capitalizeName = (name) => {
  if (!name) return "";
  return name
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getSection = (first_name) => {
  const firstChar = first_name.trim().charAt(0).toUpperCase();

  if ("ABCDEF".includes(firstChar)) return "A";
  if ("GHIJKL".includes(firstChar)) return "B";
  if ("MNOPQR".includes(firstChar)) return "C";
  if ("STUVWXYZ".includes(firstChar)) return "D";

  return "D"; // default fallback
};
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
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
    password
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
    const classAgeMap = {
      Nursery: [3, 4],
      "Pre-K": [4, 5],
      Kindergarten: [5, 6],
      "1st": [6, 7],
      "2nd": [7, 8],
      "3rd": [8, 9],
      "4th": [9, 10],
      "5th": [10, 11],
      "6th": [11, 12],
      "7th": [12, 13],
      "8th": [13, 14],
      "9th": [14, 15],
      "10th": [15, 16],
      "11th": [16, 17],
      "12th": [17, 18],
    };
    const age = calculateAge(dob);

    const ageRange = classAgeMap[class_number];

    if (!ageRange) {
      return res.status(400).json({
        success: false,
        message: "Invalid class selected",
      });
    }

    const [minAge, maxAge] = ageRange;

    if (age < minAge || age > maxAge) {
      return res.status(400).json({
        success: false,
        message: `Invalid age for ${class_number}. Age must be between ${minAge} and ${maxAge} years.`,
      });
    }
    const section = getSection(first_name);
    const classResult = await pool.query(
      "SELECT class_id FROM classes WHERE class_name = $1 AND section=$2",
      [class_number, section]
    );

    if (classResult.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }

    const class_id = classResult.rows[0].class_id;



    const selt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(password, selt);
    const Student = await pool.query(
      "INSERT INTO students (first_name,last_name,father_name,gender,dob,mobile,address,admission_date,status,class_id,password) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
      [
        capitalizeName(first_name),
        capitalizeName(last_name),
        capitalizeName(father_name),
        gender,
        dob,
        mobile,
        address,
        admission_date,
        status,
        class_id,
        secPassword
      ]
    );
    const sDetails = Student.rows[0];
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
// const RegisterStudent = async (req, res) => {
//   if (!req.body || (Array.isArray(req.body) && req.body.length === 0)) {
//     return res.status(400).json({ success: false, message: "Request body is empty" });
//   }

//   const students = Array.isArray(req.body) ? req.body : [req.body];
//   const classAgeMap = {
//     Nursery: [3, 4],
//     "Pre-K": [4, 5],
//     Kindergarten: [5, 6],
//     "1st": [6, 7],
//     "2nd": [7, 8],
//     "3rd": [8, 9],
//     "4th": [9, 10],
//     "5th": [10, 11],
//     "6th": [11, 12],
//     "7th": [12, 13],
//     "8th": [13, 14],
//     "9th": [14, 15],
//     "10th": [15, 16],
//     "11th": [16, 17],
//     "12th": [17, 18],
//   };

//   try {
//     const results = [];

//     for (const student of students) {
//       const {
//         first_name,
//         last_name,
//         gender,
//         dob,
//         father_name,
//         mobile,
//         address,
//         admission_date,
//         status,
//         class_number,
//         password,
//       } = student;

//       // Validation
//       if (
//         !first_name ||
//         !last_name ||
//         !gender ||
//         !father_name ||
//         !dob ||
//         !mobile ||
//         !address ||
//         !admission_date ||
//         !status ||
//         !class_number ||
//         !password
//       ) {
//         results.push({ student, success: false, message: "Missing required fields" });
//         continue;
//       }

//       // Age check
//       const age = calculateAge(dob);
//       const ageRange = classAgeMap[class_number];
//       if (!ageRange) {
//         results.push({ student, success: false, message: "Invalid class selected" });
//         continue;
//       }
//       const [minAge, maxAge] = ageRange;
//       if (age < minAge || age > maxAge) {
//         results.push({
//           student,
//           success: false,
//           message: `Invalid age for ${class_number}. Age must be between ${minAge} and ${maxAge}`,
//         });
//         continue;
//       }

//       // Section & Class ID
//       const section = getSection(first_name);
//       const classResult = await pool.query(
//         "SELECT class_id FROM classes WHERE class_name = $1 AND section = $2",
//         [class_number, section]
//       );
//       if (classResult.rows.length === 0) {
//         results.push({ student, success: false, message: "Class not found" });
//         continue;
//       }
//       const class_id = classResult.rows[0].class_id;

//       // Password hashing
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);

//       // Insert student
//       const dbResult = await pool.query(
//         "INSERT INTO students (first_name,last_name,father_name,gender,dob,mobile,address,admission_date,status,class_id,password) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
//         [
//           capitalizeName(first_name),
//           capitalizeName(last_name),
//           capitalizeName(father_name),
//           gender,
//           dob,
//           mobile,
//           address,
//           admission_date,
//           status,
//           class_id,
//           hashedPassword,
//         ]
//       );

//       results.push({ student: dbResult.rows[0], success: true });
//     }

//     return res.status(201).json({ success: true, results });
//   } catch (err) {
//     console.error("RegisterStudent error:", err?.message || err);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };
const StudLogin = async (req, res) => {
  const { rollno, section, class_name, password } = req.body;
  if (!rollno || !section || !class_name || !password) {
    return res.json({
      success: false,
      message: "Somthing details are missing",
    });
  }
  try {
    const classResult = await pool.query("SELECT class_id from classes where class_name=$1", [class_name]);
    if (classResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Class not found" });
    }

    const class_id = classResult.rows[0].class_id;
    const Student = await pool.query(
      "SELECT * FROM students where rollno=$1 AND section=$2 AND class_id=$3",
      [rollno, section, class_id]
    );
    if (Student.rowCount === 0) {
      res
        .status(401)
        .json({ success: false, message: "Invalid roll number, section, or class" });
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
const RollnoCreater = async (req, res) => {
  try {
    // 1️⃣ Get all classes
    const classesResult = await pool.query(
      "SELECT class_id, class_name FROM classes ORDER BY class_id"
    );

    for (const cls of classesResult.rows) {
      const class_id = cls.class_id;

      // 2️⃣ Get students of this class (NO section)
      const studentsResult = await pool.query(
        `SELECT student_id, first_name
         FROM students
         WHERE class_id = $1
         ORDER BY first_name ASC`,
        [class_id]
      );

      // 3️⃣ Assign roll numbers per class
      let rollNo = 1;
      for (const student of studentsResult.rows) {
        await pool.query(
          "UPDATE students SET rollno = $1 WHERE student_id = $2",
          [rollNo, student.student_id]
        );
        rollNo++;
      }
    }

    return res.status(200).json({
      success: true,
      message: "Roll numbers assigned successfully per class!",
    });
  } catch (err) {
    console.error("RollnoCreater error:", err?.message || err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const markAttendance = async (req, res) => {
  const { class_name, section, presentRollNos } = req.body;

  try {
    // Normalize present roll numbers to Number
    const normalizedRollNos = presentRollNos.map(Number);

    // Fetch students with class_id
    const studentsResult = await pool.query(
      `SELECT s.student_id, s.rollno, s.class_id
       FROM students s
       JOIN classes c ON s.class_id = c.class_id
       WHERE c.class_name = $1 AND c.section = $2`,
      [class_name, section]
    );

    if (studentsResult.rowCount === 0) {
      return res.status(404).json({ message: "No students found" });
    }

    // Insert / Update attendance
    for (const student of studentsResult.rows) {
      const rollNo = Number(student.rollno); // ✅ inside loop
      const status = normalizedRollNos.includes(rollNo) ? "P" : "A";

      const resultData =await pool.query(
        `INSERT INTO attendance (student_id, class_id, date, status)
         VALUES ($1, $2, CURRENT_DATE, $3)
         ON CONFLICT (student_id, class_id, date)
         DO UPDATE SET status = EXCLUDED.status RETURNING *`,
        [student.student_id, student.class_id, status]
      );
    }
    console.log("Inserted:", resultData.rows);
    res.status(200).json({
      message: "Attendance marked successfully",
      date: new Date().toISOString().split("T")[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error marking attendance" });
  }
};




export { RegisterStudent, StudLogin, UpdateStudent, DeleteStudent, RollnoCreater, markAttendance };

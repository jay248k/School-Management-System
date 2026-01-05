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
    "INSERT INTO students (first_name,last_name,gender,dob,mobile,address,admission_date,status,class_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
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

const UpdateStudent=async(req,res)=>{
  const {id}=req.params;
   const {
    first_name,
    last_name,
    gender,
    dob,
    mobile,
    address,
    admission_date,
    status,
    class_id
  } = req.body;
  try {
  const Update=await pool.query("UPDATE students SET first_name=$1,last_name=$2,gender=$3,dob=$4,mobile=$5,address=$6,admission_date=$7,status=$8,class_id=$9 WHERE student_id=$10 RETURNING *",[
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
  if(Update.rows[0]===0){
    res.json({success:false,message:"Can't update"})
  }
  res.status(200).json({success:false,message:Update.rows[0]})
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"Internal Server Error"})
  }
}

const DeleteStudent=async(req,res)=>{
  const {id}=req.params;
  try {
    const result=await pool.query("DELETE FROM students WHERE student_id=$1",[id])
    if(result.rowCount===0){
      return res.status(401).json({success:false,message:"Student not found"})
    }
    res.status(200).json({success:true,message:"Student deleted"})
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"Internal server error"})
  }
}

export { RegisterStudent,UpdateStudent,DeleteStudent };

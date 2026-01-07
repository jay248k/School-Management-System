import jwt from "jsonwebtoken";
import pool from "../utils/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const TeacherRegistration = async (req, res) => {
  const { name, mobile, qualification, joining_date, password } = req.body;
  if (!name || !mobile || !qualification || !joining_date || !password) {
    return res
      .status(401)
      .json({ success: false, message: "All Details must required" });
  }
  try {
    const selt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(password, selt);
    const Register = await pool.query(
      "INSERT INTO teachers (name,mobile,qualification,joining_date,password) values($1,$2,$3,$4,$5) RETURNING *",
      [name, mobile, qualification, joining_date, secPassword]
    );
    if (Register.rowCount === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Can't Register Teacher" });
    }
    const token = jwt.sign(
      { teacher_id: Register.rows[0].teacher_id, role: "teacher" },
      process.env.SEC
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Teacher Register successfully",
        token,
        role: "teacher",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const TeacherLogin = async (req, res) => {
    if(!req.body){
        return res.json({success:false,message:"Body must required"})
    }
  const { teacher_id, password } = req.body;
  if (!teacher_id || !password) {
    return res.json({ success: false, message: "Somthing details not found" });
  }
  try {
    const Teacher = await pool.query(
      "SELECT * FROM teachers where teacher_id=$1",
      [teacher_id]
    );
    if (Teacher.rowCount === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid teacher id or password" });
    }

    const isMatch = await bcrypt.compare(password, Teacher.rows[0].password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid teacher id or password" });
    }
    const token = jwt.sign(
      { teacher_id: teacher_id, role: "teacher" },
      process.env.SEC
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      success: true,
      message: "Login successfuly",
      token,
      role: "teacher",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const TeacherUpdate=async(req,res)=>{
    const { name, mobile, qualification, joining_date} = req.body;
    const {id}=req.params;
  if (!name || !mobile || !qualification || !joining_date) {
    return res
      .status(401)
      .json({ success: false, message: "All Details must required" });
  }
  try {
    const Update=await pool.query("UPDATE teachers SET name=$1, mobile=$2, qualification=$3, joining_date=$4 where teacher_id=$5 RETURNING *",[
    name, mobile, qualification, joining_date,id
  ])
  if(Update.rowCount===0){
    return req.status(401).json({success:false,message:"Can't Updated. Retry again!"})
  }
  res.json({success:true,message:"Updated successfuly"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
  
}
const TeacherDelete=async(req,res)=>{
    const {id}=req.params;
    if(!id){
        return res.json({success:false,message:"id must required"})
    }
    try {
        const Delete=await pool.query("DELETE FROM teachers WHERE teacher_id=$1 RETURNING *",[id])
        if(Delete.rowCount===0){
            return res.status(401).json({success:false,message:"Can't Delete"})
        }
        res.status(200).json({success:true,message:"Teacher Deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
export { TeacherRegistration, TeacherLogin,TeacherUpdate,TeacherDelete };

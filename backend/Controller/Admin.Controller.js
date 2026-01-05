import pool from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const AdminLogin = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.json({ success: false, message: "Missing" });
  }
  try {
    const result = await pool.query("SELECT * FROM ADMIN WHERE userName=$1", [
      userName,
    ]);
    if (result.rowCount[0] === 0) {
      res
        .stauts(401)
        .json({ success: false, message: "Invalid username or password" });
    }
    const admin=result.rows[0];
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      res
        .status(401)
        .json({ success: true, message: "Invalid username or password" });
    }
    const token = jwt.sign({ aid: admin.aid },process.env.SEC);
     res.cookie("token", token, {
      httpOnly: true,      
      secure: true,        
      sameSite: "none",    
      maxAge: 24 * 60 * 60 * 1000 
    });
    res.status(200).json({ success: true, message: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export { AdminLogin };

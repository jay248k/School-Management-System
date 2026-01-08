import express from 'express';
import './utils/db.js'
import StudentRouter from './Router/Student.Route.js';
import FeesRouter from './Router/Fees.Route.js';
import AdminRouter from './Router/Admin.Route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import TeacherRouter from './Router/Teacher.Route.js';
import dotenv from 'dotenv';
dotenv.config();
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:5173"
  ],
  credentials: true
}));
app.use("/api/Student",StudentRouter);
app.use("/api/fees",FeesRouter);
app.use("/api/admin",AdminRouter);
app.use("/api/teacher",TeacherRouter);
app.use((req, res) => {
  res.status(404).json({ message: "API not found" });
});
const port=process.env.PORT||5000;

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})
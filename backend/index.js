import express from 'express';
import './utils/db.js'
import StudentRouter from './Router/Student.Route.js';
import FeesRouter from './Router/Fees.Route.js';
import AdminRouter from './Router/Admin.Route.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/api/Student", StudentRouter);
app.use("/api/fees", FeesRouter);
app.use("/api/admin", AdminRouter);

const port = 5000;

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})
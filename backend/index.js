import express from 'express';
import './utils/db.js';
import StudentRouter from './Router/Student.Route.js';
import FeesRouter from './Router/Fees.Route.js';
import AdminRouter from './Router/Admin.Route.js';
import TeacherRouter from './Router/Teacher.Route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// ====== CORS CONFIG ======
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://your-frontend-domain.onrender.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));  

app.use("/api/student", StudentRouter); 
app.use("/api/fees", FeesRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/teacher", TeacherRouter);

app.get("/", (req, res) => {
    res.send("Backend is live");
});

app.use((req, res) => {
    res.status(404).json({ message: "API not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

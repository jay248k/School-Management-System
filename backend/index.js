import express from 'express';
import './utils/db.js'
import StudentRouter from './Router/Student.Route.js';
import FeesRouter from './Router/Fees.Route.js';
import AdminRouter from './Router/Admin.Route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import TeacherRouter from './Router/Teacher.Route.js';
const app = express();
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        callback(null, origin);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));


app.use("/api/Student", StudentRouter);
app.use("/api/fees", FeesRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/teacher", TeacherRouter);

const port = 5000;

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})
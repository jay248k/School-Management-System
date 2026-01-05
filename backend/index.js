import express from 'express';
import './utils/db.js'
import StudentRouter from './Router/Student.Route.js';
import FeesRouter from './Router/Fees.Route.js';
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/Student",StudentRouter);
app.use("/api/fees",FeesRouter);

const port=5000;

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})
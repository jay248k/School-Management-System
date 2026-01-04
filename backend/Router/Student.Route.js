import express from 'express';
import { RegisterStudent } from '../Controller/Student.Controller.js';

const StudentRouter=express.Router();

StudentRouter.post('/create',RegisterStudent);

export default StudentRouter;
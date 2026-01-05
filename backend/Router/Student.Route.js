import express from 'express';
import { RegisterStudent, StudLogin } from '../Controller/Student.Controller.js';

const StudentRouter=express.Router();

StudentRouter.post('/create',RegisterStudent);
StudentRouter.post('/login',StudLogin);

export default StudentRouter;
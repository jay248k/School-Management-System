import express from 'express';
import { DeleteStudent, RegisterStudent, UpdateStudent } from '../Controller/Student.Controller.js';

const StudentRouter=express.Router();

StudentRouter.post('/create',RegisterStudent);
StudentRouter.post('/update/:id',UpdateStudent);
StudentRouter.post('/delete/:id',DeleteStudent);

export default StudentRouter;
import express from 'express';
import { DeleteStudent, RegisterStudent, StudLogin, UpdateStudent } from '../Controller/Student.Controller.js';

const StudentRouter=express.Router();

StudentRouter.post('/create',RegisterStudent);
StudentRouter.post('/login',StudLogin);
StudentRouter.put('/:id/update',UpdateStudent);
StudentRouter.delete('/:id/delete',DeleteStudent);

export default StudentRouter;
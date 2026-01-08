import express from 'express';
import { DeleteStudent, RegisterStudent, StudLogin, UpdateStudent } from '../Controller/Student.Controller.js';
import isAuthenticated from '../middleware/isAutheticated.js';
import isAdmin from '../middleware/isAdmin.js';

const StudentRouter = express.Router();

StudentRouter.post('/create', isAuthenticated, isAdmin, RegisterStudent);
StudentRouter.post('/login', StudLogin);
StudentRouter.put('/:id/update', UpdateStudent);
StudentRouter.delete('/:id/delete', DeleteStudent);

export default StudentRouter;